import React from "react";
import "./PLItem.css";

export class PLItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleSelectPlayList = this.handleSelectPlayList.bind(this);
    }


    handleSelectPlayList() {
        this.props.onSelectPlayList(this.props.playlist.id);
    }


    render() {
        return (
            <div className="playlist-item-line">
                <div>{this.props.playlist.name}</div>
                <button className="btn-pl-item" onClick={this.handleSelectPlayList}>+</button>
            </div>
        );
    }
}



