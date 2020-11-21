import React, {Component} from 'react';

// Bootstrap
import Toast from "react-bootstrap/Toast";
import ToastHeader from "react-bootstrap/ToastHeader";
import ToastBody from "react-bootstrap/ToastBody";

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

class Toaster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            title: '',
            message: '',
            variety: ''
        }

    }

    toast = (toast) => {
        this.setState(toast);
    }

    render() {

        let faIcon = null;

        switch (this.state.variety) {
            case "success":
                faIcon = <FontAwesomeIcon icon={faCheck} className={`ml-auto success`}/>;
                break;
            case "danger":
                faIcon = <FontAwesomeIcon icon={faExclamationCircle} className={`ml-auto danger`}/>;
                break;
        }

        {/* Toaster */}
        return (
        <Toast show={this.state.show} onClose={() => { this.toast({show: false}) }} id='toast' className={this.state.variety} autohide>
            <ToastHeader closeButton={false}>
                {this.state.title}
                {faIcon}
            </ToastHeader>
            <ToastBody>
                {this.state.message}
            </ToastBody>
        </Toast>
        )
    }
}

export default Toaster;
