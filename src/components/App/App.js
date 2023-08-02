import { useState } from 'react';
import {SearchResults} from '../SearchResults/SearchResults'
import { Playlist } from "../Playlist/Playlist";
import { SearchBar } from "../SearchBar/SearchBar";
import Spotify from '../../util/Spotify'; // Import the Spotify module

import './App.css';
const moreTracks = [
  { name: "Track 2", artist: "Artist 2", album: "Album 2", id: 2 },
  { name: "Track 3", artist: "Artist 3", album: "Album 3", id: 3 },
  { name: "Track 4", artist: "Artist 4", album: "Album 4", id: 4 },
  { name: "Track 5", artist: "Artist 5", album: "Album 5", id: 5 },
  { name: "Track 6", artist: "Artist 6", album: "Album 6", id: 6 },
  // Add more data entries as needed...
];
function App(props) {
  const [searchResults, setSearchResults] = useState(moreTracks)
  const [playlistName, setPlaylistName] = useState('DefaultPlaylist');
  const [playlistTracks, setPlaylistTracks] = useState([
    { name: "Name of sound", artist: "artist", album: "ablum", id: 1 },
  ]);
  const addTrack = (track) => {
    const isTrackInPlaylist = playlistTracks.some(
      (playlistTrack) => playlistTrack.id === track.id
    );

    if (!isTrackInPlaylist) {
      const newPlaylist = [...playlistTracks, track];
      setPlaylistTracks(newPlaylist);
    }
  };

  const removeTrack = (track) => {
    const updatedPlaylist = playlistTracks.filter(
      (playlistTrack) => playlistTrack.id !== track.id
    );
    setPlaylistTracks(updatedPlaylist);
  };

    const updatePlaylistName = (name) => {
      setPlaylistName(name);
    };
const savePlaylist = () => {

    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris)
      .then(() => {
        // Playlist saved successfully, reset playlistName and playlistTracks state
        setPlaylistName("New Playlist");
        setPlaylistTracks([]);
      })
      .catch((error) => {
        console.error("Error saving playlist:", error);
      });
};
  const search = (term) => {
    // Log the search term to the console
    console.log("Search term:", term);
    // In a later assessment, hook this method up to the Spotify API to get search results

    // Use Spotify.search() to fetch search results
    Spotify.search(term)
      .then((tracks) => {
        // Update the state of searchResults with the value resolved from the promise
        setSearchResults(tracks);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
    // For now, let's just log the search term and set an empty array for searchResults
    // setSearchResults([]);
  };
  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component -->*/}
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          {/*<!-- Add a Playlist component --> */}
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
