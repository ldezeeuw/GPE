import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Login from './forms/Login';
import Requester from './../../Utils/Requester';
import Config from './../../Utils/Config';

class Form extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired
    };

    login = data => {
        delete data.remember;
        fetch('http://127.0.0.1/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Request-Method': 'POST',
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => {
            console.log('data', data)
        }, error => {
            console.log('zer', error)
        });
    }

    render() {
        return (
            <div>
                <div className="text-center">
                    <h2>NURSERY</h2>
                </div>
                <div className="auth-form-main">
                    <Login
                      history={this.props.history}
                      action={this.login}
                      loading={this.props.Auth.loading}
                      error={this.props.Auth.error}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({...state});

const mapDispatchToProps = dispatch => ({
    login: data => {
        // dispatch(Auth.login(data))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
