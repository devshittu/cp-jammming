import axios from "axios";
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
};

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export default Spotify;
