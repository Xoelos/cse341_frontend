import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import logo from './assets/logo.png';

// SCSS
import './App.scss';

// Components
import Home from './views/Home/Home';
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";

// Bootstrap
import Navbar from "react-bootstrap/Navbar";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Toast from "react-bootstrap/Toast";
import ToastHeader from "react-bootstrap/ToastHeader";
import ToastBody from "react-bootstrap/ToastBody";
import {LinkContainer} from 'react-router-bootstrap';

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            title: '',
            message: '',
            variety: ''
        }

        this.toast = this.toast.bind(this);
    }

    toast(show, title, message, variety) {
        this.setState({show, title, message, variety});
    }

    render() {

        let faIcon = null;

        switch (this.state.variety){
            case "success":
                faIcon = <FontAwesomeIcon icon={ faCheck } className={ `ml-auto success` } />;
                break;
            case "danger":
                faIcon = <FontAwesomeIcon icon={ faExclamationCircle } className={ `ml-auto danger` } />;
                break;
        }

        return (
            <Router>
                {/* Navbar */}
                <Navbar bg="dark" variant="dark" expand="md" id="nav">
                    <NavbarBrand>
                        <Link to="/home">
                            <Image src={logo} id="icon"/>
                        </Link>
                    </NavbarBrand>
                    <NavbarToggle/>
                    <NavbarCollapse className="justify-content-end">
                        <Nav>
                            <LinkContainer to="/login"><NavLink>Login</NavLink></LinkContainer>
                            <LinkContainer to="/register"><NavLink>Register</NavLink></LinkContainer>
                        </Nav>
                    </NavbarCollapse>
                </Navbar>
                {/* Render Views */}
                <Switch>
                    <React.Fragment>
                        <Container className="mt-5" fluid>
                            <Route path="/home">
                                <Home toast={this.toast}/>
                            </Route>
                            <Route path="/login">
                                <Login toast={this.toast}/>
                            </Route>
                            <Route path="/register">
                                <Register toast={this.toast}/>
                            </Route>
                        </Container>
                    </React.Fragment>
                </Switch>
                {/* Toaster */}
                <Toast show={ this.state.show } onClose={(e) => { this.toast(false) }} id='toast' className={ this.state.variety }>
                    <ToastHeader closeButton={false} >
                        { this.state.title }
                        { faIcon }
                    </ToastHeader>
                    <ToastBody>
                        { this.state.message }
                    </ToastBody>
                </Toast>
            </Router>
        );
    }
}

export default App;
