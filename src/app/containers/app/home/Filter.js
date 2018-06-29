/* global google */
/* eslint-disable */
import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest'
import {
    Form, Select, InputNumber, Switch, Radio, Layout,
    Slider, Button, Upload, Icon, Rate,
} from 'antd';
import {Requester} from 'uptoo-react-utils'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Demo extends React.Component {
    state = {
        latitude: 0,
        longitude: 0,
        fixtures: []
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(rslt => {
            this.setState({latitude: rslt.coords.latitude, longitude: rslt.coords.longitude})
            Requester.get("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + rslt.coords.latitude +"," + rslt.coords.longitude + "&sensor=true").then(rslt => {
                const fixtures = [];
                if (typeof rslt.error_message !== "undefined")
                    console.warn(rslt.error_message)

                rslt.results.forEach((item, i) => {
                    fixtures.push({
                        label: item.formatted_address,
                        location: item.geometry.location,
                        key: item.formatted_address + i
                    })
                });
                
                this.setState({fixtures});
            })
            
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const search = {};

        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (typeof values.address !== 'undefined' && values.address) {
                    search.lat = values.address.location.lat
                    search.lng = values.address.location.lng
                }
                if (values.child > 0) search.childs = values.child;
                if (values.distance > 0) search.distance = values.distance;

                this.props.action(search);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };

        return (
            <Form style={{ boxShadow: 'rgba(0, 0, 0, 0.10) -2px 4px 6px', marginLeft: 42, backgroundColor: '#fff', borderLeftColor: '1px solid black'}} onSubmit={this.handleSubmit}>
                <Layout.Header style={{marginBottom: 16}}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 'calc(100% - 27px)'
                      }}
                    >
                        Advanced search
                    </span>
                    <span>X</span>
                </Layout.Header>
                <FormItem
                  style={{lineHeight: 3}}
                  {...formItemLayout}
                  label="Location(s)"
                >
                    {getFieldDecorator('address', {
                    })(
                        <Geosuggest
                          autoComplete="off"
                          fixtures={this.state.fixtures}
                          placeholder="Rechercher une adresse"
                          onSuggestSelect={value => this.props.form.setFieldsValue({ address: value })}
                          location={new google.maps.LatLng(this.state.latitude, this.state.longitude)}
                          radius="20"
                        />
                    )}
                </FormItem>

                <FormItem
                  style={{lineHeight: 3}}
                  {...formItemLayout}
                  label="Childs"
                >
                    {getFieldDecorator('input-number', {initialValue: 0})(
                        <InputNumber min={0} max={10} />
                    )}
                </FormItem>
                {/*
                <FormItem
                  style={{lineHeight: 3}}
                  {...formItemLayout}
                  label="Remuneration €/H"
                >
                    {getFieldDecorator('input-number', {initialValue: 0})(
                        <InputNumber min={0} max={10} />
                    )}
                </FormItem>
                */}
                <FormItem
                  style={{lineHeight: 3}}
                  {...formItemLayout}
                  label="Distance"
                >
                    {getFieldDecorator('distance')(
                        <Slider
                          max={10}
                          min={0}
                          step={0.1}
                          marks={{
                            0: '0', 2: '2', 4: '4', 6: '6', 8: '8', 10: '10'
                          }}
                        />
                    )}
                </FormItem>

                <FormItem
                  wrapperCol={{span: 12, offset: 6}}
                >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedDemo = Form.create()(Demo);

export default WrappedDemo;