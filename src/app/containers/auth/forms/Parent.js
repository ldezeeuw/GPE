import React, { Component }            from 'react';
import { Form, Layout, Button, Input } from 'antd';

const FormItem = Form.Item;

class Parent extends Component {
    submitForm = () => {
        const values = this.props.form.getFieldsValue();
        this.props.onSubmit(values);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{ width: '420px', height: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                <Form onSubmit={this.submitForm}>
                    <Layout.Header style={{ marginBottom: 16 }}>
                        <span
                            style={{
                                display: 'inline-block',
                                width:   'calc(100% - 27px)'
                            }}
                        >
                            Création de compte
                        </span>
                    </Layout.Header>
                    <div style={{ margin: 32 }}>
                        {/*
                            firstname, lastname, email, password, longitude, latitude, children
                        */}
                        <FormItem
                            style={{ lineHeight: 3 }}
                        >
                            {getFieldDecorator('firstname')(
                                <Input placeholder="Prénom"/>
                            )}
                        </FormItem>
                        <FormItem
                            style={{ lineHeight: 3 }}
                        >
                            {getFieldDecorator('lastname')(
                                <Input placeholder="Nom de famille"/>
                            )}
                        </FormItem>
                        <FormItem
                            style={{ lineHeight: 3 }}
                        >
                            {getFieldDecorator('email')(
                                <Input type="email" placeholder="Adresse e-mail"/>
                            )}
                        </FormItem>

                        <FormItem
                            style={{ lineHeight: 3 }}
                        >
                            {getFieldDecorator('password')(
                                <Input placeholder="Mot de passe" type="password"/>
                            )}
                        </FormItem>

                        <FormItem
                            style={{ lineHeight: 3 }}
                        >
                            {getFieldDecorator('confirm-password')(
                                <Input placeholder="Confirmation mot de passe" type="password"/>
                            )}
                        </FormItem>


                        <Button
                            className="ant-btn ant-btn-success fluid"
                            style={{
                                marginLeft:    '-30px',
                                marginBottom:  '0',
                                borderRadius:  '0',
                                border:        'none',
                                position:      'absolute',
                                bottom:        '-100px',
                                left:          0,
                                right:         0,
                                height:        '100px',
                                width:         'calc(100% + 60px)',
                                textTransform: 'uppercase'
                            }}
                            onClick={this.submitForm}
                        >
                            Créer mon compte
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

const WrappedComponent = Form.create()(Parent);

export default WrappedComponent;
