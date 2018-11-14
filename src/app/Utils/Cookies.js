/* eslint vars-on-top: "off" */
/* eslint no-var: "off" */

const Cookies = {
    set(name, value, exdays = 7) {
        const d = new Date();
        const expires = `expires=${d.toUTCString()}`;
        const previousCookie = this.get(name);

        if (previousCookie !== null)
            this.delete(name);

        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

        document.cookie = `${name}=${value};${expires};path=/`;
        return null;
    },
    delete(name) {
        document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        return true;
    },
    get(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2)
            return parts.pop().split(';').shift();
        return null;
    }
};

export default Cookies;
