import React from 'react';
import {Redirect} from 'react-router-dom';
import Loadable from 'react-loadable';
import {Spin} from 'antd';
import {SubRoute} from 'uptoo-react-elements';
// import Wallz from './../../app/containers/app/home/Wall';

const Wall = Loadable({
    loader: () => import('./../../app/containers/app/home/Wall' /* webpackChunkName: 'App' */),
    loading: () => <Spin />
});

const PostNew = Loadable({
    loader: () => import('./../../app/containers/app/post/Create' /* webpackChunkName: 'App' */),
    loading: () => <Spin />
});

export default {
    path: '/home',
    component: SubRoute,
    level: 1,
    displayedName: 'HOMEE',
    routes: [{
        path: '/home/wall',
        level: 2,
        component: Wall,
        displayedIcon: 'home',
        displayedName: 'Tableau de bord'
    }, {
        path: '/home/post/new',
        component: PostNew,
        displayedIcon: 'home',
        displayedName: 'Tableau de bord'
    }
    , {
        path: '*',
        component: () => <Redirect to="/home/wall" />
    }
    ]
};
