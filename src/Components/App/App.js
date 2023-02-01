import './App.css';
import React from "react";
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "Custom playlist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  async savePlaylist() {
    const playlistName = this.state.playlistName;
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(playlistName, trackURIs);
    this.setState({
      playlistName: "Custom playlist",
      playlistTracks: []
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  search(term) {
    Spotify.search(term).then(results => {
      this.setState({
        searchResults: results
      })
    })
  }


  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}


export default App;

