let accessToken = "";
const clientId = "08288e7262af4076926795a6c5949cb8"; // Replace with your Spotify application client ID
const redirectUri = "http://localhost:3000/"; // Replace with your redirect URI
const scope = "playlist-modify-public"; // Add any other scopes you need for your application

const Spotify = {
  getAccessToken() {
    // Step 78: Check if the user's access token is already set
    if (accessToken) {
      return accessToken;
    }

    // Step 79: Check if the access token is in the URL
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Step 79: Clear the access token and expiration time from the URL
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } else {
      // Step 81: If the access token and expiration time are not in the URL
      // Redirect users to the Spotify authorization page
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(
        scope
      )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    }
  },
  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
      term
    )}`;

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Request failed!");
    }

    const data = await response.json();
    // Step 87: Map the JSON to an array of tracks
    if (!data.tracks || !data.tracks.items) {
      return [];
    }
    return data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },
  // Step 90: Create the savePlaylist method
  async savePlaylist(playlistName, trackUris) {
    // Step 90: Check if there are values saved to the method's two arguments. If not, return.
    if (!playlistName || !trackUris || trackUris.length === 0) {
      return;
    }

    // Your code to implement the three requests to the Spotify API will go here
    // Step 91: Create default variables for access token, headers, and user ID
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId = "";

    // Step 92: Make a request to get the user's Spotify username
    const response = await fetch("https://api.spotify.com/v1/me", { headers });

    if (!response.ok) {
      throw new Error("Failed to fetch user data.");
    }

    const data = await response.json();
    userId = data.id;

    // Step 93: Create a new playlist in the user's account
    const createPlaylistResponse = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: playlistName }),
      }
    );

    if (!createPlaylistResponse.ok) {
      throw new Error("Failed to create playlist.");
    }

    const playlistData = await createPlaylistResponse.json();
    const playlistId = playlistData.id;

    // Step 94: Add tracks to the newly-created playlist
    const addTracksResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uris: trackUris }),
      }
    );

    if (!addTracksResponse.ok) {
      throw new Error("Failed to add tracks to playlist.");
    }

    // All requests completed successfully, return the playlist ID
    return playlistId;
  },
};

export default Spotify;
