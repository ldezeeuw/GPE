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
            name: null
        }
    };

    handleSubmit = values => {
        if (!this.state.location.lat)
            this.setState({error: 'vous devez sélectioner une location'});
        else {
            const location = {...this.state.location};
            delete location.name;
            const data = {
                ...values,
                ...location
            };
            console.log('DATA', data)
            Requester.put(`${Config.get('API_DOMAIN')}/register`, data);
        }
    }

    render() {
        return (
            <div>
                <div style={{float: 'left', paddingRight: '32px'}}>
                    <div style={{marginLeft: 'auto', marginRight: 'auto', width: '50%'}}>
                        <Button
                          style={this.state.parentForm ? {
                            display: 'inline-block', width: '50%', color: '#40a9ff', borderColor: '#40a9ff'
                          } : {
                            display: 'inline-block', width: '50%'
                          }}
                          onClick={() => this.setState({parentForm: true})}
                        >
                            PARENT
                        </Button>
                        <Button
                          style={!this.state.parentForm ? {
                            display: 'inline-block', width: '50%', color: '#40a9ff', borderColor: '#40a9ff'
                          } : {
                            display: 'inline-block', width: '50%'
                          }}
                          onClick={() => this.setState({parentForm: false})}
                        >
                            NURSE
                        </Button>
                    </div>
                    {
                        this.state.parentForm ?
                            <ParentForm onSubmit={this.handleSubmit} />
                        :
                            <NurseForm onSubmit={this.handleSubmit} />
                    }
                </div>
                <div style={{display: 'inline-block'}}>
                    <Geolocation onLocationChange={(lat, lng, name) => this.setState({location: {lat, lng, name}})} fixtures={[]} />
                </div>
            </div>
        );
    }
}
