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
                    <h1 className="text-center mt-5">About this site</h1>
                    <p className="lead mt-5">
                        This site created using Node.js, Express, React.js and interacts with Socket.io to create a
                        simplified <a href="https://playingcarddecks.com/blogs/how-to-play/war-game-rules" target="_blank" rel="noreferrer">WAR</a> card game.
                    </p>
                    <hr />
                    <p className="lead">
                        Two players can join together and draw cards and see who wins. WAR
                        will be initiated if both players draw the same card. Score is NOT kept and the game is over
                        once the deck has been exhausted. (Simplified rules, not standard)
                    </p>
                    <hr />
                    <p className="lead">For testing this site, please open two separate versions of this site in
                        different browsers. I recommend desktop and mobile for this! Join the game together and play.
                    </p>
                </Col>
            </Row>
        )
    }
}

export default withRouter(Home);
