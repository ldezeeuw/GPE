/* eslint no-console: "off" */
const configuration = {
    API_DOMAIN: null,
    JWT_TOKEN: null,
    AUTHORIZED_USERS: [],
    STORE: null
};

const functions = {
    get: name => {
        if (configuration[name])
            return configuration[name];
        return console.warn('[react-utils] : Configuration is not defined for : ', name);
    },
    set: (name, value) => {
        configuration[name] = value;
    },
    isSet: name => typeof configuration[name] !== typeof undefined
};

export default {...functions};
