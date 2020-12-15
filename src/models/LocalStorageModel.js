import jwt_decode from "jwt-decode";

export default class LocalStorageModel {
    static get = () => {
        return {
            token: localStorage.getItem('Authorization'),
            exp: localStorage.getItem('AuthorizationExp')
        };
    }

    static set = (token) => {
        const {iat} = jwt_decode(token);
        localStorage.setItem('Authorization', token);
        localStorage.setItem('AuthorizationExp', iat + (60 * 60));
    }

    static unset = () => {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('AuthorizationExp');
    }

    static validate = (exp) => {
        if (exp <= (new Date().getTime() / 1000)) {
            this.unset()
            return false;
        }
        return true;
    }

    static parse = (json) => {
        return JSON.parse(json);
    }

    static encode = (json) => {
        return JSON.stringify(json);
    }
}
