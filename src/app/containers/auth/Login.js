import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Login from './forms/Login';
import Requester from './../../Utils/Requester';
import Config from './../../Utils/Config';
import Cookies from './../../Utils/Cookies';

class Form extends Component {
    static propTypes = {
        login: PropTypes.func.isRequired,
    };

    login = data => {
        delete data.remember;
        fetch('http://localhost:7777/login', {
            method: 'POST',
            body: JSON.stringify(data),
            dataType: 'json',
            headers: {
                Accept: '*',
                'Content-Type': 'application/json',
            },
        })
        .then(resp => resp.json() || null)
        .then(r => {
            console.log('data', r.token);
            Cookies.set('token', r.token);
            if (typeof r.token !== 'undefined')
                this.props.history.push('/home/wall')
        }, error => {
            console.error('zer', error.response || error);
        });
    };

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
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
