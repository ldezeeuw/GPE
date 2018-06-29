import React, { Component } from 'react';
import { Row, Col, Card, Icon, Avatar, Input, AutoComplete, Layout } from 'antd';
import Filter from './Filter'

const Data = require('./../../../jsons/Offers.json');

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const { Meta } = Card;

const dataSource = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
/* eslint-disable */
function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}

export default class wall extends Component {
    state = {
        offers: []
    }

    componentDidMount() {
        this.getOffers();
    }

    filterOffer = filter => {
        const offers = [...this.state.originalOffers];

        const results = offers.filter(item => {
            const dis = distance(filter.lat, filter.lng, item.location.lat, item.location.lng, 'K').toFixed(2);

            return typeof filter.distance === "undefined" ? true : dis < filter.distance;

        });
        this.setState({offers: results});
    }

    getOffers = () => {
        this.setState({offers: Data, originalOffers: Data});
    }

    render() {
        console.log('offers', this.state.offers);
        return (
            <div style={{width: '100%', overflowY: 'scroll'}}>
                <Layout.Header id="navbar" style={{width: '100%'}}>
                    <Row type="flex" justify="space-between">
                        <div className="certain-category-search-wrapper" style={{ width: 250, paddingLeft: 32, fontSize: 25 }}>
                            BABY SITTER
                        </div>
                    </Row>
                </Layout.Header>
                <Row>
                    <Col span={6} push={18}>
                        <Filter action={this.filterOffer} />
                    </Col>
                    <Col span={18} pull={6} style={{paddingLeft: 32}}>
                        <Row gutter={32} style={{marginBottom: 32, marginTop: 32}}>
                            {this.state.offers.map(item => {
                                return (
                                    <Col key={item._id} span={6}>
                                        <Card
                                          style={{width: 300, marginLeft: 'auto', marginRight: 'auto'}}
                                          cover={<img alt="example" style={{maxHeight: 150}} src={item.pictures[0]} />}
                                          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                                        >
                                            <Meta
                                              avatar={<Avatar src={item._author.picture} />}
                                              title={item.title}
                                              description={item.description}
                                            />
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
