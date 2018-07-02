/* global google */
import React, {Component} from 'react';
import {Button, Modal, Form} from 'antd';
import Geolocation from './../../../components/Geolocation/';

const FormItem = Form.Item;

const CollectionCreateForm = Form.create()(
    class extends Component {
        render() {
            const formItemLayout = {
                labelCol: {span: 6},
                wrapperCol: {span: 14},
            };
            const {visible} = this.props;

            return (
                <Modal
                  style={{top: '10px'}}
                  width="40%"
                  visible={visible}
                  onOk={this.props.onCreate}
                  footer={[
                    <Button className="modalSubmitBtn" key="submit" type="primary" onClick={this.props.onCreate}>
                      Continuer
                    </Button>,
                  ]}
                >
                    <Geolocation onLocationChange={this.props.onLocationChange} fixtures={this.props.fixtures} />
                </Modal>
            );
        }
    }
);

export default class CollectionsPage extends Component {
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) return;

            if (this.props.isSelected) this.props.toggleModal();
            else alert('You have to choose a location before you proceed');
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <CollectionCreateForm
                  onLocationChange={this.props.onLocationChange}
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.props.visible || this.props.visible}
                  onCreate={this.handleCreate}
                  fixtures={this.props.fixtures}
                  longitude={this.props.longitude}
                  latitude={this.props.latitude}
                />
            </div>
        );
    }
}
