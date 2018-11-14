import React from 'react';
import {render} from 'react-dom';
// import { Config } from 'uptoo-react-utils'
import Config from './Utils/Config';
import Root from './containers/Root';
import Store from './../config/store';
import './index.less';
import {JWT_TOKEN, AUTHORIZED_USERS, API_DOMAIN} from './../config';

const store = Store();

Config.set('STORE', store);
Config.set('JWT_TOKEN', JWT_TOKEN);
Config.set('API_DOMAIN', API_DOMAIN);
Config.set('AUTHORIZED_USERS', AUTHORIZED_USERS);

render(<Root store={store} />, document.getElementById('root'));
