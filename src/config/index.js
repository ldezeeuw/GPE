import ROUTES from './routes'

let domain

if (process.env.SANDBOX) {
    domain = 'https://api-test.uptoo.fr'
} else {
    domain = 'https://api.uptoo.fr'
}
// domain = 'https://api.uptoo.fr'
// domain = 'https://c498b40d.eu.ngrok.io'

const API_DOMAIN = domain
const JWT_TOKEN = 'adminToken'
const AUTHORIZED_USERS = ['developer', 'admin']

export {
    ROUTES,
    API_DOMAIN,
    JWT_TOKEN,
    AUTHORIZED_USERS
}
