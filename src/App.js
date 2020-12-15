import React, {Component, createRef} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Toaster from './components/toaster';
import logo from './assets/cards.png';

// SCSS
import './App.scss';

// Middleware
import PrivateRoute from "./middleware/PrivateRoute";
import PublicRoute from "./middleware/PublicRoute";
import Auth from "./middleware/Auth";
import OnLoad from "./middleware/OnLoad";

// Components
import About from './views/About/About';
import Home from './views/Home/Home';
import Game from './views/Game/Game';
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";

// Bootstrap
import Navbar from "react-bootstrap/Navbar";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import {LinkContainer} from 'react-router-bootstrap';
import {NavbarBrand} from "react-bootstrap";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectRoute: '/home',
            authed: false,
            token: null,
            user: {}
        }
        this.toaster = createRef();
    }

    componentDidMount() {
        const user = OnLoad.getUser(this.toast);
        if (user)
            user.then(res => this.setState(OnLoad.res(res))).catch(err => this.setState(OnLoad.err(err, this.toast)))
    }

    login = (user) => {
        Auth.login(user).then(res => this.setState(Auth.res(res))).catch(err => this.setState(Auth.err(err, this.toast)));
    }

    register = (user) => {
        Auth.register(user).then(res => this.setState(Auth.res(res))).catch(err => this.setState(Auth.err(err, this.toast)));
    }

    logout = () => {
        this.setState(Auth.logout());
    }

    toast = (toast) => {
        this.toaster.current.toast(toast);
    }

    render() {
        let authed = this.state.authed;
        let redirectElement = this.state.redirect
            ? <Redirect to={this.state.redirectRoute}/>
            : null;

        return (
            <Router>
                {/* Redirect Catch */}
                {redirectElement}
                {/* Navbar */}
                <Navbar bg="dark" variant="dark" expand="md" id="nav">
                    <NavbarBrand>
                        <LinkContainer to='home'>
                            <NavLink>
                                <Image src={logo} id="icon"/>
                            </NavLink>
                        </LinkContainer>
                    </NavbarBrand>
                    <NavbarToggle className="py-2"/>
                    <NavbarCollapse className="lead">
                        <Nav className="w-100">
                            <span className="mr-auto flex-grow-1 ">
                                <LinkContainer to="/about"
                                               className="ml-0 ml-md-5 my-auto"><NavLink>About</NavLink></LinkContainer>
                            </span>
                            {authed ? (
                                <>
                                    <span onClick={this.logout}>
                                        <NavLink className="my-auto">Logout</NavLink>
                                    </span>
                                </>
                            ) : (<>
                                    <LinkContainer to="/login">
                                        <NavLink className="my-auto">Login</NavLink>
                                    </LinkContainer>
                                    <LinkContainer to="/register">
                                        <NavLink className="my-auto">Register</NavLink>
                                    </LinkContainer>
                                </>
                            )}
                        </Nav>
                    </NavbarCollapse>
                </Navbar>
                {/* Render Views */}
                <Switch>
                    <React.Fragment>
                        <Container className="mt-5" fluid>
                            <Route exact path="/about">
                                <About/>
                            </Route>
                            <PublicRoute exact path='/login'
                                         component={Login}
                                         authed={this.state.authed}
                                         login={this.login}
                                         register={this.register}
                            />
                            <PublicRoute exact path='/register'
                                         component={Register}
                                         authed={this.state.authed}
                                         login={this.login}
                                         register={this.register}
                            />
                            <PrivateRoute exact path={['/home', '/']} component={Home} authed={this.state.authed}
                                          toast={this.toast} />
                            <PrivateRoute exact path='/game'
                                          component={Game}
                                          authed={this.state.authed}
                                          toast={this.toast}
                                          userId={this.state.user.id}
                            />
                        </Container>
                    </React.Fragment>
                </Switch>
                <Toaster ref={this.toaster}/>
            </Router>
        );
    }
}

export default App;
