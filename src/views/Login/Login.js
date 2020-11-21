import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// SCSS
import './Login.scss';

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    login = () => {
        this.setState(prev => ({ ...prev, password: '' }));
        this.props.login(this.state);
    }

    render() {
        return (
            <Row>
                <Col xs="12" md="6" lg="4" className="offset-md-3 offset-lg-4">
                    <h1 align="center" className="mb-5">Login</h1>
                    <Form>
                        <FormGroup>
                            <FormLabel>Email address</FormLabel>
                            <FormControl
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.change}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.change}
                            />
                        </FormGroup>
                        <Button variant="info" type="button" className="px-5" onClick={this.login} >
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default withRouter(Login);
