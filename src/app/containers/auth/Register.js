import React, { Component }             from 'react';
import { Button, Col, Row, Icon, Spin } from 'antd';
import Requester                        from './../../Utils/Requester';
import Config                           from './../../Utils/Config';
import ParentForm                       from './forms/Parent';
import NurseForm                        from './forms/Nurse';
import Geolocation                      from './../../components/Geolocation/';
import swal                             from 'sweetalert2'
import classNames                       from "classnames";

export default class Register extends Component {
    state = {
        parentForm: true,
        location:   {
            lat:  null,
            lng:  null,
            name: null,
        },
    };

    handleSubmit = (values, type = 'parent') => {
        if (!this.state.location.lat) {
            this.setState({ error: 'vous devez sélectioner une location' });
            return swal({
                type:  "warning",
                title: 'Attention',
                text:  "Vous devez sélectioner une localisation"
            })
        }
        else if (values.password !== values["confirm-password"]) {
            this.setState({ error: 'Les mots de passes ne correspondent pas' });
            return swal({
                type:  "warning",
                title: 'Attention',
                text:  "Les mots de passes ne correspondent pas"
            })
        } else {
            const location = { ...this.state.location };
            delete location.name;
            const data = {
                ...values,
                ...location,
            };

            this.setState({ loading: true })

            fetch(`http://localhost:7777/${type === 'parent' ? 'user' : 'nurse'}`, {
                method:   'POST',
                body:     JSON.stringify(data),
                dataType: 'json',
                headers:  {
                    Accept:         '*/*',
                    'Content-Type': 'application/json',
                }
            })
                .then(resp => {
                    let r = resp.json()
                    return r
                })
                .then(r => {
                    this.setState({ loading: false })
                    if (typeof r.id !== 'undefined')
                        this.props.history.push('/auth/login')
                }, error => {
                    this.setState({ loading: false })
                    console.error('zer', error.response || error);
                });
        }
    };

    handleSubmitNurse = values => {
        if (!this.state.location.lat) {
            this.setState({ error: 'vous devez sélectioner une location' });
        } else {
            const location = { ...this.state.location };
            delete location.name;
            const data = {
                ...values,
                ...location,
            };
            console.log('DATA', data);
            // Requester.post('http://localhost:8080/user', data);
            fetch('http://localhost:7777/nurse', {
                method:   'POST',
                // mode: 'no-cors',
                body:     JSON.stringify(data),
                dataType: 'json',
                headers:  {
                    // 'Access-Control-Request-Method': 'POST',
                    Accept:         '*/*',
                    'Content-Type': 'application/json',
                },
            })
                .then(resp => {
                    console.log(resp);
                })
                .then(r => {
                    console.log('data', r);
                }, error => {
                    console.error('zer', error.response || error);
                });
        }
    };

    render() {
        return (
            this.state.loading ? <Spin style={{
                    position:       'absolute',
                    top:            0,
                    left:           0,
                    right:          0,
                    bottom:         0,
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                }}/> :
                <div style={{ position: 'relative', marginBottom: '95px' }}>
                    <div className="row" onClick={() => this.props.history.push('/auth/login')}>
                        <Icon type="arrow-left"/> &nbsp;retour
                    </div>
                    <div style={{
                        // float: 'left',
                        // paddingRight: '32px',
                    }}>
                        <div style={{
                            marginLeft:  'auto',
                            marginRight: 'auto',
                            width:       '50%',
                        }}>

                            <Row>
                                <h3 style={{
                                    textTransform: 'uppercase',
                                    textAlign:     'center'
                                }}>Vous êtes...</h3>
                            </Row>

                            <Row>
                                <Col span={12} style={
                                    {
                                        paddingLeft:  '15px',
                                        paddingRight: '15px'
                                    }
                                }>
                                    <Button
                                        className="fluid"
                                        style={this.state.parentForm ? {
                                            display:     'inline-block',
                                            width:       '100%',
                                            color:       '#40a9ff',
                                            borderColor: '#40a9ff',
                                        } : {
                                            display: 'inline-block',
                                            width:   '100%',
                                        }}
                                        onClick={() => this.setState({ parentForm: true })}
                                    >
                                        PARENT
                                    </Button>
                                </Col>
                                <Col span={12} style={
                                    {
                                        paddingLeft:  '15px',
                                        paddingRight: '15px'
                                    }
                                }>
                                    <Button
                                        className="fluid"
                                        style={!this.state.parentForm ? {
                                            display:     'inline-block',
                                            width:       '100%',
                                            color:       '#40a9ff',
                                            borderColor: '#40a9ff',
                                        } : {
                                            display: 'inline-block',
                                            width:   '100%',
                                        }}
                                        onClick={() => this.setState({ parentForm: false })}>
                                        NURSE
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                        {
                            this.state.parentForm ? <ParentForm onSubmit={this.handleSubmit}/>
                                : <NurseForm onSubmit={this.handleSubmit}/>
                        }
                    </div>
                    <div style={{ display: 'inline-block', width: '100%' }}>
                        <Geolocation onLocationChange={(lat, lng, name) => this.setState({
                            location: {
                                lat,
                                lng,
                                name,
                            },
                        })} fixtures={[]}/>
                    </div>

                    <div className="row" style={{ width: '100%' }}>
                        <hr style={{
                            border:       "1px solid #d9d9d9",
                            color:        "#d9d9d9",
                            marginTop:    '30px',
                            marginBottom: '30px'
                        }}/>
                        {/*<Button
                        style={{
                            marginLeft:  'auto',
                            marginRight: 'auto',
                            display:     'block',
                            // position:    'absolute',
                            // bottom:      '16px',
                            width:       '368px',
                            color:       '#40a9ff',
                            borderColor: '#40a9ff'
                        }}
                        onClick={this.state.parentForm ? this.handleSubmit : this.handleSubmitNurse}
                    >
                        Inscription
                    </Button>*/}
                    </div>
                </div>
        );
    }
}
