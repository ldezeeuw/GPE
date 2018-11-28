import Config from './Config'

const Cookies = {
    set(name, value, exdays = 7) {
        const d = new Date()
        const previousCookie = this.get(name)
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))

        if (previousCookie !== null)
            this.delete(name)

        const expire = `expires=${d.toUTCString()}`
        document.cookie = `${name}=${value};${expire};path=/`
        return null
    },
    delete(name) {
        const domain = '';
        // `domain=${Config.get('COOKIE_DOMAIN')}`;
        document.cookie = `${name}=;path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT;`
        return true
    },
    get(name) {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2)
            return parts.pop().split(';').shift()
        return null
    }
}

export default Cookies
