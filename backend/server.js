const express = require('express');
require = require('esm')(module /*, options */)
const { loginWithSpotify, getLikedArtists } = require('./SpotifyAPI.js');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 8000;
const state = Math.random().toString(36).substring(2, 15);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let token = [null, null];
let code = null;
// Serve the homepage
app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.post('/login', (req, res) => {
  code = req.body.code;
  const state_from_req = req.body.state;
  // Do something with the code here, like store it in a database or use it to get an access token
  if(state === state_from_req){
    console.log("state matches");
    res.status(200).send('Login successful');
    
  }
  else{
    console.log("state does not match");
    res.status(403).send('Login failed');
  }
});

app.get('/state', (req, res) => {
  const response = { state: state };
  console.log("state");
  res.send(response);
});




// Return the user's top liked artists
app.get('/liked-artists', async (req, res) => {


    token = await loginWithSpotify(code);
    if(token !== [null, null]) 
{
  try {
    console.log("a",token[0]);
    const data = await getLikedArtists(token[0]);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }}
  else{
    res.status(403).send('Login failed');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
