import React, {Component} from 'react';

// SCSS
import './playingCard.scss';

// Bootstrap
import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";

// Card Flip
import ReactCardFlip from 'react-card-flip';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

class PlayingCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <ReactCardFlip isFlipped={this.props.isFlipped} flipDirection="vertical" flipSpeedFrontToBack={0} >
            <Card className="card m-0" onClick={this.handleClick}>
                <CardImg className="mt-auto" src={ `${BASE_URL}${this.props.image}` } />
            </Card>
            <Card className="card m-0" onClick={this.handleClick}>
                <CardImg className="mt-auto" src={ `assets/gray_back.jpg`} />
            </Card>
            </ReactCardFlip>
        )
    }
}

export default PlayingCard;
