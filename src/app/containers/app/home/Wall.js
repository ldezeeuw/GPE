import React, {Component} from 'react';
import {Icon, Row, Col, Card, Avatar, AutoComplete, Layout} from 'antd';
import {Requester} from 'uptoo-react-utils';
import moment from 'moment';
import LocationModal from './locationModal';
import Filter from './Filter';
import OrderBy from './OrderBy';
const Data = require('./../../../jsons/Offers.json');


function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1)
        dist = 1;
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}

export default class wall extends Component {
    state = {
        offers: [],
        fixtures: [],
        locationName: '',
        latitude: 0,
        longitude: 0,
        modalVisible: true
    }

    componentDidMount() {
        this.getOffers();
        navigator.geolocation.getCurrentPosition(rslt => {
            Requester
            .get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${rslt.coords.latitude},${rslt.coords.longitude}&sensor=true`)
            .then(result => {
                const fixtures = [];
                if (typeof result.error_message !== 'undefined') console.warn(result.error_message);

                result.results.forEach((item, i) => {
                    fixtures.push({
                        label: item.formatted_address,
                        location: item.geometry.location,
                        key: item.formatted_address + i
                    });
                });
                this.setState({fixtures});
            });
        });
    }

    getDistance(location) {
        return (
            this.state.latitude !== 0 ?
                distance(
                    this.state.latitude,
                    this.state.longitude,
                    location.lat,
                    location.lng,
                    'K'
                )
            :
                0
            );
    }

    getOffers = () => {
        this.setState({offers: Data, originalOffers: Data});
    }

    getDuration({start, end}) {
        var now  = end;
        var then = start;

        var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
        var d = moment.duration(ms);
        var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

        return {second: s, mili: ms};
    }

    sort = (key, order) => {
        const offers = [...this.state.offers];

        offers.sort((a, b) => {
            switch (key) {
                case 'duration':
                    return order === 'up' ? this.getDuration(a.time).mili > this.getDuration(b.time).mili : this.getDuration(a.time).mili < this.getDuration(b.time).mili;

                case 'child':
                    return order === 'up' ? a.childrens.length > b.childrens.length : a.childrens.length < b.childrens.length;

                case 'distance':
                    return (
                        order === 'up' ?
                            distance(
                                a.location.lat,
                                a.location.lng,
                                this.state.latitude,
                                this.state.longitude
                            ) > distance(
                                b.location.lat,
                                b.location.lng,
                                this.state.latitude,
                                this.state.longitude
                            )
                        :
                            distance(
                                a.location.lat,
                                a.location.lng,
                                this.state.latitude,
                                this.state.longitude
                                ) < distance(
                                    b.location.lat,
                                    b.location.lng,
                                    this.state.latitude,
                                    this.state.longitude
                                )
                    );

                    default:
                        return null;
            }
        });
        this.setState({offers});
        console.log('SORTED OFFERS', offers);
    }

    filterOffer = filter => {
        const offers = [...this.state.originalOffers];
        let results = offers;

        if (typeof filter.duration !== 'undefined')
            results = results.filter(item => {
                const dur = moment.duration(this.getDuration(item.time).mili);
                console.log(dur.hours(), filter.duration[0], filter.duration[1], dur.hours() > filter.duration[0], dur.hours() < filter.duration[1]);
                return filter.duration[1] !== 5 ? dur.hours() >= filter.duration[0] && dur.hours() <= filter.duration[1] : dur.hours() >= filter.duration[0];
            });
        if (typeof filter.distance !== 'undefined')
            results = results.filter(item => {
                const dis = distance(filter.lat, filter.lng, item.location.lat, item.location.lng, 'K').toFixed(2);
                return dis < filter.distance;
            });
        if (typeof filter.childs !== 'undefined')
            results = results.filter(item => {
                return item.childrens.length <= filter.childs;
            });
        this.setState({offers: results});
    }

    canCloseLocationModal = () => {
        console.log(this.state.latitude, this.state.longitude);
        return this.state.latitude !== 0 && this.state.longitude !== 0;
    }

    render() {
        return (
            <div style={{width: '100%', overflowY: 'scroll'}}>
                <LocationModal
                  toggleModal={() => this.setState({modalVisible: !this.state.modalVisible})}
                  visible={this.state.modalVisible}
                  isSelected={this.state.lat !== 0 && this.state.lng !== 0 && this.state.locationName !== ''}
                  onClose={this.canCloseLocationModal}
                  onLocationChange={(lat, lng, name) => this.setState({latitude: lat, longitude: lng, locationName: name})}
                  fixtures={this.state.fixtures}
                />
                <Layout.Header id="navbar" style={{width: '100%'}}>
                    <Row type="flex" justify="space-between">
                        <div className="certain-category-search-wrapper" style={{width: 250, paddingLeft: 32, fontSize: 25}}>
                            BABY SITTER
                        </div>
                    </Row>
                </Layout.Header>
                <OrderBy action={this.sort} />
                <Row>
                    <Col span={6} push={18}>
                        <Filter
                          action={this.filterOffer}
                          fixtures={this.state.fixtures}
                          latitude={this.state.latitude}
                          longitude={this.state.longitude}
                          locationName={this.state.locationName}
                          toggleModal={() => this.setState({modalVisible: !this.state.modalVisible})}
                        />
                    </Col>
                    <Col span={18} pull={6} style={{paddingLeft: 32}}>
                        <Row gutter={32}>
                            {this.state.offers.map(item => (
                                    <Col key={item._id} span={6}>
                                        <Card
                                          style={{width: 300, marginLeft: 'auto', marginRight: 'auto'}}
                                          cover={<img alt="example" style={{maxHeight: 150}} src={item.pictures[0]} />}
                                          actions={[
                                            <div>{`${this.getDistance(item.location).toFixed(2)}/km`}</div>,
                                            <div>{this.getDuration(item.time).second}</div>,
                                            <div>{`${item.remuneration}€/h`}</div>
                                          ]}
                                        >
                                            <Card.Meta
                                              avatar={<Avatar src={item._author.picture} />}
                                              title={item.title}
                                              description={
                                                <div>
                                                    <div style={{height: '100px'}}>
                                                      {item.description}
                                                    </div>
                                                    <span><Icon type="team" />{item.childrens.length}</span>
                                                </div>
                                              }
                                            />
                                        </Card>
                                    </Col>
                                )
                            )}
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
