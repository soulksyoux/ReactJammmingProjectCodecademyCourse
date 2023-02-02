import React from "react";
import "./PLList.css";
import { PLItem } from "../PLItem/PLItem";

export class PLList extends React.Component {



    render() {
        return (
            <div className="PLList">
                {this.props.pllists.map(playlist => {
                    return (
                        <PLItem key={playlist.id} playlist={playlist} onSelectPlayList={this.props.onSelectPlayList} />
                    )
                })}
            </div>
        );
    }
}