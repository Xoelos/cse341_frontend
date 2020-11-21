import React, {Component} from "react";
import {withRouter} from "react-router-dom";

// SCSS
import './About.scss';

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col xs="12" md="6" lg="4" className="offset-md-3 offset-lg-4">
                    <h1>About</h1>
                    <p>This site is to play some blackjack!</p>
                </Col>
            </Row>
        )
    }
}

export default withRouter(Home);
