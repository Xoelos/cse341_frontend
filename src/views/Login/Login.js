import React from "react";
import { Component } from "react";

// SCSS
import './Login.scss';

// Axios
import axios from "axios";

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
    }

    render() {
        return(
            <Row>
                <Col xs="12" md="6" lg="4" className="offset-md-3 offset-lg-4">
                    <h1 align="center" className="mb-5">Login</h1>
                    <Form>
                        <FormGroup controlId="formBasicEmail">
                            <FormLabel>Email address</FormLabel>
                            <FormControl type="email" placeholder="Enter email" />
                        </FormGroup>

                        <FormGroup controlId="formBasicPassword">
                            <FormLabel>Password</FormLabel>
                            <FormControl type="password" placeholder="Password" />
                        </FormGroup>
                        <Button variant="info" type="button" className="px-5">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default Login;
