import Config from './Config';
import Cookies from './Cookies';

const REDIRECT = "REDIRECT";
const AUTH_TOKEN = "AUTH_TOKEN";

class Requester
{
    constructor(StorageManager)
    {
        this.StorageManager = StorageManager;
    }

    execute = (originUrl, initialParams) => {
        let url = originUrl;
        const params = initialParams;
        const store = Config.get('STORE');
        const TOKEN = this.StorageManager.get(Config.get('JWT_TOKEN'));

        // if (originUrl.substring(0, 4) !== 'http') {
        //     if (originUrl.substring(0, 1) !== '/')
        //         url = `/${originUrl}`;
        //     url = `${Config.get('API_DOMAIN')}${originUrl}`;
        // }

        if (typeof TOKEN !== 'undefined' && TOKEN)
            params.headers.authorization = TOKEN;

        const query = fetch(url, params).then(resp => {
            return resp.json();
        }).then(resp => {
            return resp;
        });
        return query;
    };
    
    get = url => {
        const params = {
            method: 'GET',
            headers: {'Access-Control-Request-Method': 'GET'}
        };
        return this.execute(url, params);
    };

    post = (url, data = {}) => {
        const params = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Request-Method': 'POST',
                'Content-Type': 'application/json'
            }
        };
        return this.execute(url, params);
    };

    put = (url, data = {}) => {
        const params = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Access-Control-Request-Method': 'PUT',
                'Content-Type': 'application/json'
            }
        };
        return this.execute(url, params);
    };

    delete = url => {
        const params = {
            method: 'DELETE',
            headers: {'Access-Control-Request-Method': 'DELETE'}
        };
        return this.execute(url, params);
    };
}

let instance = null;

function getInstance() {
    /**
     * Singelton (Une seul instance de classe)
     * 
     * Instanciated with the default storage manager
     */
    if (!instance)
        instance = new Requester(Cookies);
    return instance;
}

export default {
    Instance: Requester,
    get: getInstance().get,
    post: getInstance().post,
    put: getInstance().put,
    delete: getInstance().delete
};
