// Set up the OAuth credentials
const clientId = '0a572a2bcee3498cafdd358cd91b3236';
//i removed the secret cause prof said not to post it on github
const clientSecret = 'be6f80ecdc464aeaa5273c7c5cb0e19f';
const redirectUri = 'http://localhost:3000/spotify';

async function loginWithSpotify(code) {
  return new Promise(async (resolve, reject) => {

    // Exchange the authorization code for an access token
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const encodedClientIdAndSecret = btoa(`${clientId}:${clientSecret}`);
    const data = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    };

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${encodedClientIdAndSecret}`,
        },
        body: new URLSearchParams(data),
      });

      const tokenData = await response.json();
      console.log(tokenData.access_token)
      const accessToken = tokenData.access_token;
      const refreshToken = tokenData.refresh_token;
      console.log("b",accessToken);
      resolve([accessToken, refreshToken]);
  }
  catch(error) {
    reject(error);
    console.error(error);
  }
});
}

  
  function getLikedArtists(accessToken) {
    return new Promise(async (resolve, reject) => {
      try {
        // Use the access token to get the user's liked artists
        const artistsUrl =
          'https://api.spotify.com/v1/me/following?type=artist&after=0I2XqVXqHScXjHhk6AYYRe&limit=10';
        const artistsResponse = await fetch(artistsUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        const artistsData = await artistsResponse.json();
        const likedArtists = artistsData.artists.items;
        console.log(artistsData);
  
        // Resolve the promise with likedArtists
        resolve(likedArtists);
      } catch (err) {
        // Reject the promise with the error

        reject(err);
      }
    });
  }
  async function getUserId(accessToken) {
    const url = 'https://api.spotify.com/v1/me';
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user data from Spotify API');
    }
  
    const data = await response.json();
    return data.id;
  }
  
  async function refreshAccessToken(refreshToken) {
    const fetch = require('node-fetch'); // for making HTTP requests
    const refreshURL = 'https://accounts.spotify.com/api/token';
  
    // Send a POST request to the refresh token endpoint to get a new access token
    const response = await fetch(refreshURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientID + ':' + clientSecret).toString('base64')
      },
      body: new URLSearchParams({
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken
      })
    });
  
    // Parse the response body and extract the new access token
    const responseBody = await response.json();
    const accessToken = responseBody.access_token;
  
    return accessToken;
  }
  
  
  
  module.exports = {
    loginWithSpotify,
    getLikedArtists,
    getUserId,
    refreshAccessToken
  };
