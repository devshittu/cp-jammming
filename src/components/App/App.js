import './App.css';
import {SearchResults} from '../SearchResults/SearchResults'
import { Playlist } from "../Playlist/Playlist";
import { SearchBar } from "../SearchBar/SearchBar";
import { useState } from 'react';

function App(props) {
  const [searchResults, setSearchResults] = useState([{name: 'Name of sound', artist: 'artist', album: 'ablum', id: 1}])
  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        {/* <!-- Add a SearchBar component --> */}
        <SearchBar />
        <div className="App-playlist">
          {/* <!-- Add a SearchResults component -->*/}
          <SearchResults searchResults={searchResults} />
          {/*<!-- Add a Playlist component --> */}
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;
