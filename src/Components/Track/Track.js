import React from 'react';
import "./Track.css";

export class Track extends React.Component {

    constructor(props) {
        super(props);
        this.isRemoval =  true;
    }

    renderAction() {
        return this.isRemoval ? '-' : '+';
    }

    render() {
        return (
            <div className="Track">
            <div className="Track-information">
                <h3>{this.props.name}</h3>
                <p>{this.props.artist} | {this.props.album}</p>
            </div>
            <button className="Track-action">{this.renderAction()}</button>
            </div>
        );
    }
}