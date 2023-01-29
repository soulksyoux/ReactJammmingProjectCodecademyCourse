import './App.css';
import React from "react";
import ReactDOM from "react-dom";
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {name: "teste", artist: "teste", album: "teste", id: "4"},
        {name: "teste2", artist: "teste2", album: "teste2", id: "5"},
        {name: "teste3", artist: "teste3", album: "teste3", id: "6"},
      ],
      playlistName: "Custom playlist",
      playlistTracks: [
        {name: "pl-teste", artist: "pl-teste", album: "pl-teste", id: "1"},
        {name: "pl-teste2", artist: "pl-teste2", album: "pl-teste2", id: "2"},
        {name: "pl-teste3", artist: "pl-teste3", album: "pl-teste3", id: "3"},
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(trackFromList => trackFromList.id === track.id)) {
      return;
    }
    this.setState({
      playlistTracks: [...this.state.playlistTracks, track]
    })
  }

  removeTrack(track) {
    let newList = this.state.playlistTracks.filter(trackFromList => trackFromList.id !== track.id);
    this.setState({
      playlistTracks: newList
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  componentDidMount() {
    //this.addTrack({name: "pl-teste4", artist: "pl-teste4", album: "pl-teste4", id: "4"}); 
  }

  componentDidUpdate() {
    console.log(this.state.playlistTracks);
  }


  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;

