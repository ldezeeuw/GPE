import React, {Component} from 'react';
import ParentForm from './forms/Parent';
import NurseForm from './forms/Nurse';
import {Button} from 'antd';

export default class Register extends Component {
    state = {
        parentForm: true
    };

    render() {
        return (
            <div>
                <Button
                  style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}
                  onClick={() => this.setState({parentForm: true})}
                >
                    PARENT
                </Button>
                <Button
                  style={{marginLeft: 'auto', marginRight: 'auto', display: 'block'}}
                  onClick={() => this.setState({parentForm: false})}
                >
                    NURSE
                </Button>
                {
                    this.state.parentForm ?
                        <ParentForm />
                    :
                        <NurseForm />
                }
            </div>
        );
    }
}
