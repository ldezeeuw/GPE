/* global google */
/* eslint-disable */
import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest'
import {
    Form, Select, InputNumber, Switch, Radio, Layout,
    Slider, Button, Upload, Icon, Rate,
} from 'antd';

import Map from './../../../components/Geolocation/Map';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Demo extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const search = {};

        this.props.form.validateFields((err, values) => {
            if (!err) {
                search.lat = this.props.latitude;
                search.lng = this.props.longitude;

                if (values.price > 0) search.price = values.price;
                if (values.childs > 0) search.childs = values.childs;
                if (values.distance > 0) search.distance = values.distance;
                if (values.duration[1] > 0) search.duration = values.duration;

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
            <Form style={{overflow: 'hidden', marginTop: -48, boxShadow: 'rgba(0, 0, 0, 0.10) -2px 4px 6px', marginLeft: 42, backgroundColor: '#fff', borderLeftColor: '1px solid black'}} onSubmit={this.handleSubmit}>
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
                <div style={{margin: 32}}>
                    <FormItem
                      style={{lineHeight: 3}}
                    >
                        <Button style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}} onClick={this.props.toggleModal}>
                            {this.props.locationName}
                        </Button>
                    </FormItem>

                    <FormItem
                      style={{lineHeight: 3}}
                      label="Childs"
                    >
                        {getFieldDecorator('childs', {initialValue: 0})(
                            <InputNumber min={0} max={10} />
                        )}
                    </FormItem>
                    <FormItem
                      style={{lineHeight: 3}}
                      label="Duration"
                    >
                        {getFieldDecorator('duration', {initialValue: [0, 0]})(
                            <Slider
                              range
                              max={5}
                              min={0}
                              step={1}
                              marks={{
                                0: '0', 5: '+5'
                              }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                      style={{lineHeight: 3}}
                      label="Price"
                    >
                        {getFieldDecorator('price')(
                            <Slider
                              range
                              max={20}
                              min={0}
                              step={1}
                              marks={{
                                0: '0', 5: '+5'
                              }}
                            />
                        )}
                    </FormItem>
                    filter by price
                    ajouter les points sur la map
                </div>
                <div style={{margin: 32}}>
                    <Map radius={this.props.form.getFieldValue('distance')} lat={this.props.latitude} lng={this.props.longitude} />
                </div>
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

                <FormItem wrapperCol={{span: 12, offset: 6}}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedDemo = Form.create()(Demo);

export default WrappedDemo;