import LS from "../models/LocalStorageModel";
import axios from "axios";
import _ from "lodash";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default class OnLoad {

    static getUser = (toast) => {
        const { token, exp } = LS.get();

        if (!token) {
            toast({show: false, title: "", message: "", variety: ""});
            return false;
        } else if (!LS.validate(exp)) {
            toast({show: true, title: "Logged out!", message: "You have been logged out due to inactivity!", variety: 'danger'});
            return false;
        }

        return axios.get(`${BASE_URL}/api/user/`, {
            headers: {Authorization: `Bearer ${token}`},
        });
    }

    static res = (res) => {
        if (_.has(res, 'data.user') && _.has(res, 'data.token')) {
            LS.set(res.data.token);
            return {
                redirect: false,
                redirectRoute: '/',
                authed: true,
                user: res.data.user,
                token: res.data.token
            }
        } else throw "Error!";
    }

    static err = (err, toast) => {
        const msg = _.has(err, 'response.data.data')
            ? err.response.data.data
            : "Error with sending request!";
        console.log(msg)
        toast({show: true, title: "Error", message: msg, variety: 'danger'});
        return false;
    }
}
