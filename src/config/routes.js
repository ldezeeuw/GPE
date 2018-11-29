import React        from 'react'
import { Redirect } from 'react-router-dom'
import App          from './../app/containers/App'
import Auth         from './routes/Auth'

import Home from './routes/Home'

export default [
    Auth,
    {
        path:          '/',
        component:     App,
        displayedName: 'Uptoo',
        routes:        [
            Home,
            {
                path:      '*',
                component: () => <Redirect to="/home/wall"/>
            }
        ]
    }
]
