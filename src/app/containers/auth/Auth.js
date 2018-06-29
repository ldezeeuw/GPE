import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { Redirect } from 'react-router-dom'
import { Template } from 'uptoo-react-redux'

class Auth extends Component {
    // static propTypes = {
    //     location: PropTypes.object.isRequired,
    //     resetErrors: PropTypes.func.isRequired,
    //     Auth: PropTypes.object.isRequired,
    //     route: PropTypes.object.isRequired
    // };

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.location.pathname !== this.props.location.pathname) {
    //         this.props.resetErrors()
    //     }
    // }

    render() {
        // if (this.props.Auth.user) {
            return <Redirect to="/home/wall" />
        // }

        // return (
        //     <div/>
        // )
    }
}
/*
    <div id="auth">
        <div className="content">
            <div className="text-center">
                <img
                  alt="UPTOO logo"
                  className="logo"
                  src="https://storage.googleapis.com/uptoo-developer/illustrations_public/logo_uptoo.png"
                />
            </div>
            {renderRoutes(this.props.route.routes)}
        </div>
    </div>
*/

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
    resetErrors: () => {
        dispatch(Template.resetErrors())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
