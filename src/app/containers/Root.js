import React, { Component }      from 'react';
import PropTypes                 from 'prop-types';
import { message, notification } from 'antd';
import { Provider, connect }     from 'react-redux';
import { renderRoutes }          from 'react-router-config';
import { ConnectedRouter }       from 'react-router-redux';
import { Redirect }              from 'react-router-dom'
import { Template }              from 'uptoo-react-redux';
// import {Window} from 'uptoo-react-elements'
import Cookies                   from './../Utils/Cookies';
import ShallowEquals             from './../Utils/ShallowEquals';
import { history }               from './../../config/store';
import { ROUTES, JWT_TOKEN }     from './../../config';

/* eslint-disable */
// Break few eslint rules with no suitable fix
// if (process.env.NODE_ENV !== 'production') {
//     var DevTools = require('./../components/DevTools/').default
// }
/* eslint-enable */

class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        init:  PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        message.config({
            top:      11,
            duration: 2
        });

        notification.config({
            placement: 'bottomLeft',
            bottom:    0,
            left:      16,
            duration:  0
        });
    }

    componentWillMount() {
        this.props.init(ROUTES);

        const token = Cookies.get(JWT_TOKEN);

        if (token) {
            // this.props.restore(token);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ShallowEquals.shouldComponentUpdate(this, nextProps, nextState);
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <div style={{ height: '100%' }}>
                    <ConnectedRouter history={history}>
                        {renderRoutes(ROUTES)}
                    </ConnectedRouter>
                </div>
            </Provider>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    init: routes => {
        dispatch(Template.routesInit(routes));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
