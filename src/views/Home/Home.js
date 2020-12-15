import React, { Component } from "react";
import { withRouter, Redirect} from "react-router-dom";

// SCSS
import './Home.scss';

// Libraries
import axios from "axios";
import LS from "../../models/LocalStorageModel";
import _ from "lodash";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons'

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            gameId: null,
            redirect: false
        }
    }

    componentDidMount() {
        this.getGames();
    }

    getGames = () => {
        const {token} = LS.get() || null;
        axios.get(`${BASE_URL}/api/game`,
            {
                headers: {Authorization: `Bearer ${token}`},
            }
        ).then(res => {
            console.log(res.data);
            if (_.has(res, 'data')) {

                this.setState({games: res.data});
            } else throw "Error!";
        }).catch(err => {
            console.log(err)
        })
    }

    createGame = () => {
        const {token} = LS.get() || null;
        axios.post(`${BASE_URL}/api/game`,
            {
                withCredentials: true
            },
            {
                headers: {Authorization: `Bearer ${token}`},
            }
        ).then(res => {
            if (_.has(res, 'data')) {
               this.join(res.data);
            }
        });
    }

    join = (gameId) => {

        this.setState({redirect: true, gameId});
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to={{ pathname: '/game',  state: { gameId: this.state.gameId }}}/>;
        }

        return (
            <Row>
                {this.state.games.length ?
                    <Col xs="12">
                        <Button className="d-block mx-auto mb-5" onClick={() => this.createGame()}>Create New Server</Button>
                    </Col>
                    : null
                }
                <Col xs="9" md="6" className="offset-md-3">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Server</th>
                            <th>Player Count</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.games.length
                            ? this.state.games.map((game, index) =>
                            <tr key={index}  onClick={() => this.join(game.id)}>
                                <td>#{game.id}</td>
                                <td>{game.count}/2</td>
                            </tr>
                        )
                            : <tr><td colSpan="2" className="text-center py-5" onClick={() => this.createGame()}>Create a new game!</td></tr>}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <Button variant="light" className="mt-2" onClick={() => this.getGames()}>
                        <FontAwesomeIcon icon={faSync}/>
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default withRouter(Home);
