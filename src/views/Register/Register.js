import React from "react";
import { Component } from "react";
import { withRouter } from "react-router-dom";

// SCSS
import './Register.scss';

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import FormText from "react-bootstrap/FormText";
import Button from "react-bootstrap/Button";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirm: '',
        }
    }

    change = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    register  = () => {
        this.setState(prev => ({...prev, password: '', passwordConfirm: ''}))
        this.props.register(this.state);
    }

    render() {
        return(
            <Row>
                <Col xs="12" md="6" lg="4" className="offset-md-3 offset-lg-4">
                    <h1 align="center" className="mb-5">Register</h1>
                    <Form>
                        <FormGroup>
                            <Row>
                                <Col md="6">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={ this.state.firstName }
                                        onChange={ this.change }
                                    />
                                </Col>
                                <Col md="6">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={ this.state.lastName }
                                        onChange={ this.change }
                                    />
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Email address</FormLabel>
                            <FormControl
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={ this.state.email }
                                onChange={ this.change }
                            />
                            <FormText className="text-muted">
                                We&apos;ll never share your email with anyone else.
                            </FormText>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={ this.state.password }
                                onChange={ this.change }
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormControl
                                type="password"
                                name="passwordConfirm"
                                placeholder="Confirm Password"
                                value={ this.state.passwordConfirm }
                                onChange={ this.change }
                            />
                        </FormGroup>
                        <Button variant="info" type="button" className="px-5" onClick={ this.register }>
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default withRouter(Register);
