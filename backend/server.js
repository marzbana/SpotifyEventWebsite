const { loginWithSpotify, getLikedArtists, getUserId, refreshAccessToken } = require('./SpotifyAPI.js');
const encrypt = require('./cookie.js');
const express = require('express'); //Backend Framework
const {listDatabases,main} = require('./mongoDB.js');

const cors = require('cors');
const app = express();
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
const port = 8000;
const state = Math.random().toString(36).substring(2, 15);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let access = null;
let code = null;




//main().catch(console.error); //Call our main function to test the DB.


// Serve the homepage
app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});
//server returns the state and code to the client
//need to get an access token and refresh token and store in db
//also need to use it to get a user id and create a cookie for the user
app.post('/login', (req, res) => {
  code = req.body.code;
  const state_from_req = req.body.state;
  //check if the state matches the one sent to the client
  //we need to retrieve it from the db first
  if(state === state_from_req){
    console.log("state matches");
    //now get the token and check if user exists in db
   loginWithSpotify(code).then((token) => {
    access=token;
    //get the users id
    getUserId(token[0]).then((id) => {
      //create encrypted id
      const encrypted_id = encrypt(id);
      //check if user exists in db
      if(false){
        //store the users token in db
      }
      //if not create a new user using encrypted id
      else{
        //create a new user in db
        //store encrypted id and token in db
      }
        //create a cookie for the user
        res.cookie('user_id', encrypted_id, { maxAge: 3600, httpOnly: true });
        res.status(200).send('Login successful');
    });
   });
  
    
    
  }
  else{
    console.log("state does not match");
    res.status(403).send('Login failed');
  }
});
//frontend gets a state from the server 
app.get('/state', (req, res) => {
  //generate state
  //store state in db
  const response = { state: state };
  console.log("state");
  res.send(response);
});




// Return the user's top liked artists
app.get('/liked-artists', async (req, res) => {
  //get the user's token from the db
  //check if the access token works
  //if it does not work use the refresh token to get a new access token
    if(access !== null) 
{
  try {
    console.log("a",access);
    const data = await getLikedArtists(access);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }}
  else{
    res.status(403).send('Login failed');
  }
});

//delete the user's session when the front end calls this
//user logs off from front end
app.post('/logout', (req, res) => {
  //delete the user's tokens from the db
  //delete the user's cookie from the db
  //delete the user's cookie
  res.clearCookie('user_id');
  res.status(200).send('Logout successful');
  console.log("logout");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
