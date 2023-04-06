function loginWithSpotify(x) {
    // Set up the OAuth credentials
    const clientId = '0a572a2bcee3498cafdd358cd91b3236';
    const redirectUri = 'http://localhost:3000/spotify';
  
    // Generate a random string for the state parameter
    const state = x;
  
    // Encode the redirect URI to use as a query parameter
    const encodedRedirectUri = encodeURIComponent(redirectUri);
  
    // Build the authorization URL
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodedRedirectUri}&state=${state}&scope=user-library-read%20user-follow-read`;
  
    // Redirect the user to the authorization URL

    return authUrl;
  }
  
  function getLikedArtists(code) {
    return new Promise(async (resolve, reject) => {
      // Set up the OAuth credentials
      const clientId = '0a572a2bcee3498cafdd358cd91b3236';
      const clientSecret = 'be6f80ecdc464aeaa5273c7c5cb0e19f';
      const redirectUri = 'http://localhost:8001/';
  
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
        const accessToken = tokenData.access_token;
  
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

  
        // Resolve the promise with likedArtists
        resolve(likedArtists);
      } catch (err) {
        // Reject the promise with the error
        reject(err);
      }
    });
  }
  
  
  module.exports = { getLikedArtists, loginWithSpotify };