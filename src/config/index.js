import ROUTES from './routes';

const domain = 'http://localhost:80';

// if (process.env.SANDBOX) {
//     domain = 'https://api-test.uptoo.fr';
// } else {
//     domain = 'https://api.uptoo.fr';
// }
// domain = 'https://api.uptoo.fr'
// domain = 'https://c498b40d.eu.ngrok.io'

const API_DOMAIN = domain;
const JWT_TOKEN = 'token';
const AUTHORIZED_USERS = ['developer', 'admin'];

export {
    ROUTES,
    API_DOMAIN,
    JWT_TOKEN,
    AUTHORIZED_USERS
};
