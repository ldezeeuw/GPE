import React, {Component} from 'react';
import {Form, Layout, Button, Input} from 'antd';

const FormItem = Form.Item;

class Nurse extends Component {
    submitForm = () => {
        console.log('FORM SUBMITTED');
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form onSubmit={this.submitForm}>
                    <Layout.Header style={{marginBottom: 16}}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: 'calc(100% - 27px)'
                          }}
                        >
                            Creation de compte
                        </span>
                    </Layout.Header>
                    <div style={{margin: 32}}>
                        {/*
                            firstname, lastname, email, password, longitude, latitude, children
                        */}
                        <FormItem
                          style={{lineHeight: 3}}
                        >
                            {getFieldDecorator('firstname')(
                                <Input placeholder="First name" />
                            )}
                        </FormItem>
                        <FormItem
                          style={{lineHeight: 3}}
                        >
                            {getFieldDecorator('lastname')(
                                <Input placeholder="Last name" />
                            )}
                        </FormItem>
                        <FormItem
                          style={{lineHeight: 3}}
                        >
                            {getFieldDecorator('birthDate')(
                                <Input placeholder="Birth date" />
                            )}
                        </FormItem>
                        <FormItem
                          style={{lineHeight: 3}}
                        >
                            {getFieldDecorator('email')(
                                <Input type="email" placeholder="First name" />
                            )}
                        </FormItem>
                        <FormItem
                          style={{lineHeight: 3}}
                        >
                            {getFieldDecorator('password')(
                                <Input placeholder="password" />
                            )}
                        </FormItem>

                        FAIRE UNE MAP POUR LA LONGITUDE LATITUDE
                        <FormItem
                          style={{lineHeight: 3}}
                        >
                            <Button
                              style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}
                              onClick={this.submitForm}
                            >
                                NEXT
                            </Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        );
    }
}

const WrappedComponent = Form.create()(Nurse);

export default WrappedComponent;
