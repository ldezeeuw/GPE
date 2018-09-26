import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Auth } from 'uptoo-react-redux'
import Login from './forms/Login'
// import Authenticator from './forms/Authenticator'

class Form extends Component {
    static propTypes = {
        Auth: PropTypes.shape({
            loading: PropTypes.bool,
            error: PropTypes.string
        }).isRequired,
        authenticate: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired
    };

    render() {
        return (
            <div>
                <div className="auth-form-main">
                    <Login
                      action={this.props.login}
                      loading={this.props.Auth.loading}
                      error={this.props.Auth.error}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
    login: data => {
        dispatch(Auth.login(data))
    },
    authenticate: data => {
        dispatch(Auth.authenticate(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
