import React from 'react';
import "./Track.css";

export class Track extends React.Component {

    constructor(props) {
        super(props);
        //this.isRemoval =  true;
        this.addTrack = this.addTrack.bind(this);
    }

    renderAction() {
        return this.isRemoval ? '-' : '+';
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    render() {
        return (
            <div className="Track">
            <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} | {this.props.track.album}</p>
            </div>
            <button className="Track-action" onClick={ this.isRemoval ? "" : this.addTrack } >{this.renderAction()}</button>
            </div>
        );
    }
}