import React from 'react';
import {Redirect} from 'react-router-dom';
import Loadable from 'react-loadable';
import {Spin} from 'antd';


const Auth = Loadable({
    loader: () => import('./../../app/containers/auth/Auth' /* webpackChunkName: 'Auth' */),
    loading: () => <Spin />
});

const Login = Loadable({
    loader: () => import('./../../app/containers/auth/Login' /* webpackChunkName: 'Login' */),
    loading: () => <Spin />
});

const Register = Loadable({
    loader: () => import('./../../app/containers/auth/Register' /* webpackChunkName: 'Register' */),
    loading: () => <Spin />
});

export default {
    path: '/auth',
    component: Auth,
    routes: [{
        path: '/auth/login',
        component: Login
    }, {
        path: '/auth/register',
        component: Register
    }
    // , {
    //     path: '*',
    //     component: () => <Redirect to="/auth/login" />
    // }
    ]
};
