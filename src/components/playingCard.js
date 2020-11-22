import React, {Component} from 'react';

// SCSS
import './playingCard.scss';

// Bootstrap
import Card from "react-bootstrap/Card";
import CardImg from "react-bootstrap/CardImg";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

class PlayingCard extends Component {
    constructor(props) {
        super(props);
        console.log(props.card.card.image)
    }

    render() {

        return (
            <Card className="card">
                {`${this.props.card.card.name} of ${this.props.card.card.suit}`}
                <CardImg className="mt-auto" src={ `${BASE_URL}${this.props.card.card.image}` } />
            </Card>
        )
    }
}

export default PlayingCard;
