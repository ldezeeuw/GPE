import React, {Component} from 'react';
import {Button} from 'antd';
import Requester from './../../Utils/Requester';
import Config from './../../Utils/Config';
import ParentForm from './forms/Parent';
import NurseForm from './forms/Nurse';
import Geolocation from './../../components/Geolocation/';

export default class Register extends Component {
    state = {
        parentForm: true,
        location: {
            lat: null,
            lng: null,
            name: null,
        },
    };

    handleSubmit = values => {
        if (!this.state.location.lat) {
            this.setState({error: 'vous devez sélectioner une location'});
        } else {
            const location = {...this.state.location};
            delete location.name;
            const data = {
                ...values,
                ...location,
            };
            console.log('DATA', data);
            // Requester.post('http://localhost:8080/user', data);
            fetch('http://localhost:7777/user', {
                method: 'POST',
                // mode: 'no-cors',
                body: JSON.stringify(data),
                dataType: 'json',
                headers: {
                    // 'Access-Control-Request-Method': 'POST',
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                }
            })
            .then(resp => {
                return resp.json()
            })
            .then(r => {
                console.log('data', r);
            }, error => {
                console.error('zer', error.response || error);
            });
        }
    };

    handleSubmitNurse = values => {
        if (!this.state.location.lat) {
            this.setState({error: 'vous devez sélectioner une location'});
        } else {
            const location = {...this.state.location};
            delete location.name;
            const data = {
                ...values,
                ...location,
            };
            console.log('DATA', data);
            // Requester.post('http://localhost:8080/user', data);
            fetch('http://localhost:7777/nurse', {
                method: 'POST',
                // mode: 'no-cors',
                body: JSON.stringify(data),
                dataType: 'json',
                headers: {
                    // 'Access-Control-Request-Method': 'POST',
                    Accept: '*/*',
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
            <div>
                <div style={{
                    float: 'left',
                    paddingRight: '32px',
                }}>
                    <div style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '50%',
                    }}>
                        <Button
                            style={this.state.parentForm ? {
                                display: 'inline-block',
                                width: '50%',
                                color: '#40a9ff',
                                borderColor: '#40a9ff',
                            } : {
                                display: 'inline-block',
                                width: '50%',
                            }}
                            onClick={() => this.setState({parentForm: true})}
                        >
                            PARENT
                        </Button>
                        <Button
                            style={!this.state.parentForm ? {
                                display: 'inline-block',
                                width: '50%',
                                color: '#40a9ff',
                                borderColor: '#40a9ff',
                            } : {
                                display: 'inline-block',
                                width: '50%',
                            }}
                            onClick={() => this.setState({parentForm: false})}>
                            NURSE
                        </Button>
                    </div>
                    {
                        this.state.parentForm ?
                            <ParentForm onSubmit={this.handleSubmit}/>
                            :
                            <NurseForm onSubmit={this.handleSubmitNurse}/>
                    }
                </div>
                <div style={{display: 'inline-block'}}>
                    <Geolocation onLocationChange={(lat, lng, name) => this.setState({
                        location: {
                            lat,
                            lng,
                            name,
                        },
                    })} fixtures={[]}/>
                </div>
            </div>
        );
    }
}
