import React from 'react';
import "./SearchResults.css";
import { TrackList } from '../TrackList/TrackList';

export class SearchResults extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return(
            <div className="SearchResults">
                <h2>Results</h2>
                {/* Add a TrackList component */}
                <TrackList searchResults={this.props.searchResults} />
            </div>
        );
    }
}