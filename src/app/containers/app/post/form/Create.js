import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Form, Icon, Input, Button, Alert, DatePicker, InputNumber} from 'antd';
import LocationModal from './../../home/locationModal';
import moment from 'moment';

class Login extends PureComponent {
    static propTypes = {};

    static defaultProps = {};

    state = {
        startValue: null,
        endValue: null,
        endOpen: false,
        modalVisible: false,
        latitude: null,
        longitude: null,
    };

    disabledStartDate = startValue => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = endValue => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = value => {
        this.onChange('startValue', value);
    };

    onEndChange = value => {
        this.onChange('endValue', value);
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({endOpen: true});
        }
    };

    handleEndOpenChange = open => {
        this.setState({endOpen: open});
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const post = {
                ...values,
                start: moment(this.state.startValue)
                    .toISOString(),
                end: moment(this.state.endValue)
                    .toISOString(),
                latitude: this.state.latitude,
                longitude: this.state.longitude,
            };
            if (!post.start ||
                !post.end ||
                !post.latitude ||
                !post.longitude) {
                this.setState({error: 'tout les champs ne sonts pas remplis'});
            } else if (!err) {
                this.props.onSubmit(post);
            }
        });
    };

    render() {
        const {error, form} = this.props;
        const {getFieldDecorator} = form;
        const {startValue, endValue, endOpen} = this.state;

        return (
            <Form style={{padding: '32px'}} onSubmit={this.handleSubmit}>
                {error || this.state.error && <Alert message={error || this.state.error} type="error" showIcon/>}
                <Form.Item>
                    <div>Titre</div>
                    {getFieldDecorator('title')(
                        <Input size="large" prefix={<Icon type="user"/>} placeholder="Titre"/>,
                    )}
                </Form.Item>
                <Form.Item>
                    <div>Description</div>
                    {getFieldDecorator('description')(
                        <Input.TextArea size="large" rows={4} prefix={<Icon type="user"/>} placeholder="Description"/>,
                    )}
                </Form.Item>
                <Form.Item>
                    <div>Date et heure de début</div>
                    <DatePicker
                        disabledDate={this.disabledStartDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={startValue}
                        placeholder="Start"
                        onChange={this.onStartChange}
                        onOpenChange={this.handleStartOpenChange}
                    />
                    <div>Date et heure de fin</div>
                    <DatePicker
                        disabledDate={this.disabledEndDate}
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        value={endValue}
                        placeholder="End"
                        onChange={this.onEndChange}
                        open={endOpen}
                        onOpenChange={this.handleEndOpenChange}
                    />
                </Form.Item>
                <Form.Item>
                    <div>Nombre d'enfants</div>
                    {getFieldDecorator('nb_children', {initialValue: 1})(
                        <InputNumber min={1} max={10}/>,
                    )}
                </Form.Item>
                <Form.Item>
                    <div>Taux horraire</div>
                    {getFieldDecorator('hourly_rate', {initialValue: 9})(
                        <InputNumber
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />,
                    )}/H
                </Form.Item>

                <Form.Item>
                    <div>Note</div>
                    {getFieldDecorator('note')(
                        <Input size="large" prefix={<Icon type="user"/>} placeholder="Note"/>,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => this.setState({modalVisible: !this.state.modalVisible})} type="primary">
                        Choose a location
                    </Button>
                </Form.Item>
                <LocationModal
                    toggleModal={() => this.setState({modalVisible: !this.state.modalVisible})}
                    visible={this.state.modalVisible}
                    isSelected={this.state.lat !== 0 && this.state.lng !== 0 && this.state.locationName !== ''}
                    onClose={this.canCloseLocationModal}
                    onLocationChange={(lat, lng, name) => this.setState({
                        latitude: lat,
                        longitude: lng,
                        locationName: name,
                    })}
                    fixtures={this.state.fixtures}
                />
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="fluid" loading={this.props.loading}>
                        Connexion
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(Login);
