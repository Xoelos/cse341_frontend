// React
import React, {Component} from "react";
import {Redirect, withRouter} from "react-router-dom";
import GameModel from "../../models/GameModel";

// SCSS
import './Game.scss';

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PlayingCard from "../../components/playingCard/playingCard";
import Alert from "react-bootstrap/Alert";


class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameId: this.props.location.state.gameId,
            game: new GameModel(this.props.userId, this.props.location.state.gameId),
            redirect: false,
            cards: [],
            players: [],
            playing: false,
            draw: false,
            winner: undefined,
            showFirst: false,
            showLast: false,
            showWar: false,
            war: false,
        }
    }

    componentDidMount() {
        this.state.game.join(this.redirect, this.watchPlayers, this.drawCards, this.displayResults, this.gameover);
    }

    componentWillUnmount() {
        this.state.game.disconnect();
    }

    watchPlayers = (players) => {
        this.setState({players});
        if (players.length === 2) {
            this.start();
        } else if (this.state.playing && players.length < 2) {
            this.props.toast({
                show: true,
                title: "Error",
                message: "Other player disconnected!",
                variety: 'danger'
            });
            this.redirect();
        }
    }

    redirect = () => {
        this.setState({redirect: true});
    }

    start = () => {
        this.setState({playing: true});
    }

    draw = () => {
        this.setState({draw: true});
        this.state.game.draw();
    }

    drawCards = (cards) => {
        if (cards.length === 0) {
            this.displayResults(0);
            setTimeout(() => {
                this.setState({
                    cards,
                    draw: false,
                    showFirst: false,
                    showLast: false,
                    showWar: false,
                    war: false,
                    winner: undefined
                });
            }, 1000 * 6)
        } else if (cards.length === 2 || cards.length === 1) {
            this.setState({
                cards,
                winner: undefined,
                showFirst: false,
                showLast: false,
                showWar: false,
                war: false,
            });
        } else {
            this.setState({cards});
        }
    }

    displayResults = (playerId) => {
        this.setState({showFirst: false, showLast: false, showWar: false});

        setTimeout(() => {
            this.state.cards.length === 2
                ? this.setState({showFirst: true})
                : this.setState({showFirst: true, showLast: true, showWar: true});
        }, 1000 * 2);


        setTimeout(() => {
            if (playerId === null) {
                this.setState({winner: null, draw: false, showLast: true});
                this.state.game.war();
            } else if (typeof playerId === 'undefined') {
                this.setState({ winner: undefined, draw: false });
            } else if (playerId === 0) {
                this.setState({ winner: 0 });
            } else {
                this.setState({winner: (playerId === this.props.userId), draw: false})
            }
        }, 1000 * 4);
    }

    gameover = () => {
        this.setState({draw: true})
        this.props.toast({
            show: true,
            title: "Game Over!",
            message: "You will be returned to the home page.",
            variety: 'success'
        });
        setTimeout(() => this.redirect(),1000 * 4)
    }

    render() {
        if (this.state.redirect) return <Redirect to={{pathname: '/home'}}/>;

        const userHand = this.state.cards.filter(card => card.userId === this.props.userId);
        const enemyHand = this.state.cards.filter(card => card.userId !== this.props.userId);

        return (
            <>
                <Row className="mb-5">
                    <Col xs="12" md="3" lg="2" className="mb-5 mb-md-0">
                        <Col xs="12">
                            <h4 className="mb-5">Game Code: #{this.state.gameId}</h4>
                        </Col>
                        <Col xs="12">
                            <h4>Players:</h4>
                            {this.state.players.map((player, index) =>
                                <p className="lead m-0" key={index}>{player['user.first_name']}</p>
                            )}
                        </Col>
                    </Col>
                    <Col xs="12" md="9" lg="10">
                        {this.state.playing ?
                            (<>
                                <Row className="cards">
                                    <Col xs="6"><h2>Your hand</h2></Col><Col xs="6"><h2>Their hand</h2></Col>
                                    <Col xs="6" className="hand align-content-center justify-content-center">
                                        {userHand.map((card, index) =>
                                            index === 0 || index === 4
                                                ? <PlayingCard key={index}
                                                               image={card.image}
                                                               isFlipped={false}/>
                                                : <PlayingCard key={index}
                                                               image={card.image}
                                                               isFlipped={!this.state.showWar}/>
                                        )}
                                    </Col>
                                    <Col xs="6" className="hand align-content-center justify-content-center">
                                        {enemyHand.map((card, index) =>
                                            index === 0
                                                ? <PlayingCard  key={index}
                                                                image={card.image}
                                                                isFlipped={!this.state.showFirst}/>
                                                : index === 4
                                                    ? <PlayingCard key={index}
                                                                   image={card.image}
                                                                   isFlipped={!this.state.showLast}/>
                                                    : <PlayingCard key={index}
                                                                   image={card.image}
                                                                   isFlipped={!this.state.showWar}/>)}
                                    </Col>
                                </Row>
                                {
                                    !this.state.draw ?
                                        (<Row className="draw mt-5">
                                            <Button onClick={() => this.draw()}
                                                    className="d-block mx-auto">Draw!</Button>
                                        </Row>)
                                        : null
                                }
                            </>)
                            : null
                        }
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" md="4" lg="2" className="offset-0 offset-md-4 offset-lg-5 text-center">
                        {this.state.winner === true
                            ? (<Alert variant="success" className="p-4 lead">Winner!</Alert>)
                            : this.state.winner === false
                                ? (<Alert variant="warning" className="p-4 lead">Lose!</Alert>)
                                : this.state.winner === null
                                    ? <Alert variant="warning" className="p-4 h4">WAR!</Alert>
                                    : this.state.winner === 0
                                        ? <Alert variant="primary" className="p-4 lead">Tie Round</Alert>
                                        : null
                        }
                    </Col>
                </Row>
            </>
        )
    }
}

export default withRouter(Game);
