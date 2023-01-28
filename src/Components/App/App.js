import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: "teste", artist: "teste", album: "teste", id: "1"},
        {name: "teste2", artist: "teste2", album: "teste2", id: "2"},
        {name: "teste3", artist: "teste3", album: "teste3", id: "3"},
      ]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            {/* Add a Playlist component */}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;

