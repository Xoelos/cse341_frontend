import React from "react";
import { Component } from "react";

// SCSS
import './Register.scss';

// Axios
import axios from "axios";

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

        this.change = this.change.bind(this);
        this.register = this.register.bind(this);
    }

    register(e) {
        e.preventDefault();
        axios.post(
            'http://localhost:3000/user/register',
            { ...this.state }
        ).then(res => {
            this.props.toast(true, "Success", "User has been created!", 'success');
            console.log(res.data);
        }).catch(err => {
            this.props.toast(true, "Error", err.response.data, 'danger');
            console.log(err.response.data);
        })
    }

    change(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
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
                                    <FormControl type="text" name="firstName" value={ this.state.firstName } onChange={ this.change }/></Col>
                                <Col md="6">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl type="text" name="lastName" value={ this.state.lastName } onChange={ this.change }/>
                                </Col>
                            </Row>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Email address</FormLabel>
                            <FormControl type="email" name="email" value={ this.state.email } onChange={ this.change } />
                            <FormText className="text-muted">
                                We'll never share your email with anyone else.
                            </FormText>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Password</FormLabel>
                            <FormControl type="password" name="password" value={ this.state.password } onChange={ this.change } />
                        </FormGroup>
                        <FormGroup>
                            <FormLabel>Password</FormLabel>
                            <FormControl type="password" name="passwordConfirm" value={ this.state.passwordConfirm } onChange={ this.change }  />
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

export default Register;
