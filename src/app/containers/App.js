import React, { Component }       from 'react'
import PropTypes                  from 'prop-types'
import { connect }                from 'react-redux'
import { Redirect, Route }        from 'react-router-dom'
import { renderRoutes }           from 'react-router-config'
import { ShallowEquals, Cookies } from 'uptoo-react-utils'
import { Auth, Template, Socket } from 'uptoo-react-redux'
// import { Socket as SocketConnect } from 'uptoo-react-web-elements'
import { Layout }                 from 'antd'
import Navbar                     from './template/Navbar'
import Sidebar                    from './template/Sidebar'
import { API_DOMAIN, JWT_TOKEN }  from './../../config/index'

class App extends Component {
    static propTypes = {
        route:             PropTypes.object.isRequired,
        Template:          PropTypes.object.isRequired,
        Auth:              PropTypes.object.isRequired,
        location:          PropTypes.object.isRequired,
        resetErrors:       PropTypes.func.isRequired,
        sidebarSetVisible: PropTypes.func.isRequired,
        history:           PropTypes.object.isRequired,
        logout:            PropTypes.func.isRequired,
        toggle:            PropTypes.func.isRequired
    };

    componentDidMount() {
        this.initSidebar(this.props.Template)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.resetErrors()

            if (nextProps.Template.size.device === 'mobile') {
                this.props.sidebarSetVisible(false)
            }
        }

        if (nextProps.Template.size !== this.props.Template.size) {
            this.initSidebar(nextProps.Template)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ShallowEquals.shouldComponentUpdate(this, nextProps, nextState)
    }

    navbar = this.props.Auth.user && this.props.Template.routes.navbar.filter(route => {
        const permission = !route.permission || this.props.Auth.user.permissions.includes(route.permission)
        return route.nested !== false && permission
    })

    token = Cookies.get(JWT_TOKEN)

    initSidebar = template => {
        let isVisible = true

        if (template && template.size && template.size.device === 'mobile') {
            isVisible = false
        }

        this.props.sidebarSetVisible(isVisible)
    }

    render() {
        // if (!this.props.Auth.user) {
        //     return <Redirect to="/auth/login" />
        // }
        if (!Cookies.get(JWT_TOKEN) || Cookies.get(JWT_TOKEN) === null)
            return <Redirect to='/auth/login'/>
        return (
            <Layout id="app" className={this.props.Template.sidebar.isVisible ? 'collapsed' : ''}>
                <Layout hasSider>
                    <Sidebar
                        user={this.props.Auth.user}
                        routes={this.props.Template.routes.sidebar}
                        location={this.props.location}
                        history={this.props.history}
                        collapsed={!this.props.Template.sidebar.isVisible}
                    />
                    {renderRoutes(this.props.route.routes)}
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({
    sidebarSetVisible: isVisible => {
        dispatch(Template.sidebarSetVisible(isVisible));
    },
    resetErrors:       () => {
        dispatch(Template.resetErrors());
    },
    logout:            () => {
        dispatch(Auth.logout());
    },
    toggle:            () => {
        dispatch(Template.sidebarToggle());
    },
    onMessage(e, data) {
        dispatch(Socket.onMessage(e, data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
