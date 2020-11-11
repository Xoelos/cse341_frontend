import React from "react";
import { Component } from "react";

// SCSS
import './Home.scss';

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Row>
                <Col xs="12"></Col>
            </Row>
        )
    }

}

export default Home;
