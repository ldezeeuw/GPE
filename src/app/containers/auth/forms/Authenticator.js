import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Alert } from 'antd'

class Authenticator extends PureComponent {
    static propTypes = {
        action: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
        form: PropTypes.object.isRequired,
        error: PropTypes.string
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
            <Form onSubmit={this.handleSubmit}>
                <div style={{ minHeight: 40, marginBottom: 10 }}>
                    {error && <Alert message={error} type="error" showIcon />}
                </div>

                <Form.Item>
                    {getFieldDecorator('digicode')(
                        <Input size="large" prefix={<Icon type="lock" />} placeholder="Digicode à 6 chiffres" />
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="fluid" loading={this.props.loading}>
                        Connexion
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(Authenticator)
