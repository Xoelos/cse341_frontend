import axios from "axios";
import _ from "lodash";
import LS from "../models/LocalStorageModel";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;


export default class Auth {

    static login = (user) => {
        return axios.post(
            `${BASE_URL}/api/user/login`,
            {...user}
        );
    }

    static register = (user) => {
        return axios.post(
            `${BASE_URL}/api/user/register`,
            {...user}
        );
    }

    static res = (res) => {
        if (_.has(res, 'data.user') && _.has(res, 'data.token')) {
            LS.set(res.data.token);
            return {
                redirect: true,
                redirectRoute: '/home',
                authed: true,
                user: res.data.user,
                token: res.data.token
            };
        } else throw "Error!";
    }

    static err = (err, toast) => {
        const msg = _.has(err, 'response.data.data')
            ? err.response.data.data
            : "Error with sending request!";
        console.log(msg);
        toast({show: true, title: "Error", message: msg, variety: 'danger'});
        return {redirect: false, authed: false, user: {}, token: null};
    }

    static logout = () => {
        LS.unset();
        return {
            token: null,
            user: {},
            authed: false,
            redirectRoute: '/login',
            redirect: true
        };
    }
}
