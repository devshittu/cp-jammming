let accessToken = "";
const clientId = "08288e7262af4076926795a6c5949cb8";
const redirectUri = "http://cp-jammming.surge.sh/";
const scope = "playlist-modify-public";

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");

      return accessToken;
    } else {
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
  async savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris || trackUris.length === 0) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId = "";

    const response = await fetch("https://api.spotify.com/v1/me", { headers });

    if (!response.ok) {
      throw new Error("Failed to fetch user data.");
    }

    const data = await response.json();
    userId = data.id;

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

    return playlistId;
  },
};

export default Spotify;
