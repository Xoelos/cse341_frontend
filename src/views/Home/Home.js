import React, {Component} from "react";
import {withRouter} from "react-router-dom";

// SCSS
import './Home.scss';

// Libraries
import axios from "axios";
// import _ from 'lodash';

// Components

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import LS from "../../models/LocalStorageModel";
import _ from "lodash";
import PlayingCard from "../../components/playingCard";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            deck: [],
        }
    }

    createDeck = () => {
        const {token} = LS.get() || null;
        axios.post(`${BASE_URL}/api/game`,
            {
                id: this.props.userId,
                withCredentials: true
            },
            {
                headers: {Authorization: `Bearer ${token}`},
            }
        ).then(res => {
            console.log(res.data);
            if (_.has(res, 'data')) {
                this.setState({deck: res.data});
            } else throw "Error!";
        }).catch(err => {
            const msg = _.has(err, 'response.data.data')
                ? err.response.data.data
                : "Error with sending request!";
            console.log(msg);
            this.props.toast({show: true, title: "Error", message: msg, variety: 'danger'});
        })
    }

    render() {
        return (
            <Row>
                <Col xs="12">
                    <Button onClick={this.createDeck}>Create new game</Button>
                </Col>
                <Col xs="12">
                    <span className="deck">
                        {this.state.deck.map((card, index) =>
                            <PlayingCard card={card} key={index}>Test</PlayingCard>
                          )}
                    </span>
                </Col>
            </Row>
        )
    }
}

export default withRouter(Home);
