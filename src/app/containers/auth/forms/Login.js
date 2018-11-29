import React, { PureComponent }                                 from 'react'
import PropTypes                                                from 'prop-types'
import { Form, Icon, Input, Button, Alert, Row, Col, Checkbox } from 'antd'

class Login extends PureComponent {
    static propTypes = {
        action:  PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        form:    PropTypes.object.isRequired,
        error:   PropTypes.string
    };

    static defaultProps = {
        error: null
    };

    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.action(values)
            }
        })
    }

    render() {
        const { error, form } = this.props
        const { getFieldDecorator } = form

        return (
            <Form onSubmit={this.handleSubmit} className={'ant-form-login'}>
                <div style={{ minHeight: 40, marginBottom: 10 }}>
                    {error && <Alert message={error} type="error" showIcon/>}
                </div>

                <Form.Item className="input-email">
                    {getFieldDecorator('email')(
                        <Input size="large" prefix={<Icon type="user"/>} placeholder="Votre adresse email"/>
                    )}
                </Form.Item>

                <Form.Item className="input-pwd">
                    {getFieldDecorator('password')(
                        <Input size="large" prefix={<Icon type="lock"/>} type="password" placeholder="Mot de passe"/>
                    )}
                </Form.Item>

                <Form.Item>
                    <Row type="flex" justify="start">
                        <Col>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue:  false
                            })(
                                <Checkbox>Se souvenir de mes identifiants</Checkbox>
                            )}
                        </Col>
                    </Row>
                    {/*<Row type="flex" justify="space-between" style={{ marginTop: 30 }}>
                        <Col>
                            <div onClick={() => this.props.history.push('register')}>Inscription</div>
                        </Col>
                    </Row>*/}


                </Form.Item>

                <Form.Item style={{ marginTop: 30 }}>
                    <Button type="primary" htmlType="submit" className="fluid" loading={this.props.loading}>
                        Connexion
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(Login)
