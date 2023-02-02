import React from "react";
import "./Playlists.css";
import { PLList } from "../PLList/PLList";

export class Playlists extends React.Component {



    render() {
        return (
            <div className="SearchResults">
                <h2 className="title">Playlists</h2>
                <PLList pllists={this.props.playlists} onSelectPlayList={this.props.onSelectPlayList} />
            </div>
        );
    }
}