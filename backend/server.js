//FUNCTIONS
const { loginWithSpotify, getLikedArtists, getUserId, refreshAccessToken } = require('./SpotifyAPI.js');
const encrypt = require('./cookie.js');
const { getConcertDetails, getConcerts } = require('./ticketMasterAPI.js');
//IMPORTS
const express = require('express'); //Backend Framework
const cors = require('cors'); //Cross Origin Resource Sharing
const bodyParser = require('body-parser'); //Body Parser
const MongoDB = require('./MongoDB.js'); //our mongoDb class
const cookieParser = require('cookie-parser'); //Cookie Parser
//OBJCTS
const mongo = new MongoDB();
//SETTING UP THE APP
const app = express();
//CORS
//app.use(cors());
app.use(cors({
origin: 'http://localhost:3000',
credentials: true
}));
//PORT
const port = 8000;
//BODY PARSER MIDDLEWARE
app.use(bodyParser.json());
//COOKIE PARSER MIDDLEWARE
app.use(cookieParser());

//SERVER CODE

// Serve the homepage
app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});
//server returns the state and code to the client
//need to get an access token and refresh token and store in db
//also need to use it to get a user id and create a cookie for the user
app.post('/login', (req, res) => {
  try{
  //code and state sent from the front end
  const code = req.body.code;
  const state_from_req = req.body.state;
 //initial state
  const state = req.cookies.state;
  console.log("code: " + code);
  console.log("state from req: " + state_from_req);
  console.log("state from cookie: " + state);
   //check if the state matches the one sent to the client thats stored in a cookie
  if(state === state_from_req){
    console.log("state matches");
    //now get the token and check if user exists in db
   loginWithSpotify(code).then((token) => {
    //get the users id
    getUserId(token[0]).then((id) => {
      //create encrypted id
      const encrypted_id = encrypt(id);
      //add user refresh and access token to the db
        mongo.databaseInsertion("access_token", token[0], encrypted_id);
        mongo.databaseInsertion("refresh_token", token[1], encrypted_id);
        //store the time the token was created
        mongo.databaseInsertion("token_created", Date.now(), encrypted_id);
        //create a cookie for the user     
        res.status(200).send(encrypted_id);
      });
        
    }); 
  }
  else{
    console.log("state does not match");
    res.status(403).send('Login failed');
  }
}
catch(error){
  console.log(error);
  res.status(403).send('Login failed');
}
});
//frontend gets a state from the server 
app.get('/state', (req, res) => {
  //generate state
  const state = Math.random().toString(36).substring(2, 15);
  const response = { state: state };
  console.log("state");
  //allow cors
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send(response);
});




// Return the user's top liked artists
app.get('/liked-artists', async (req, res) => {
  console.log("liked artists");
  //check if the access token works
  console.log("user id: " + req.cookies.user_id);
  const time_1= await mongo.databaseQuery("token_created", req.cookies.user_id);
  //if it does not work use the refresh token to get a new access token
    if(Date.now() - time_1 <= 3500000)
{
  try {
    
    //get access token from db
    const access = await mongo.databaseQuery("access_token", req.cookies.user_id);
    //get liked artits from spotify
    const data = await getLikedArtists(access);
    //send liked artists to the front end
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }}
  else{
    try{
      //get refresh token from db
      const refresh = await mongo.databaseQuery("refresh_token", req.cookies.user_id);
      //get new access token from spotify
      const new_access = await refreshAccessToken(refresh);
      //add new access token to db
      mongo.databaseInsertion("access_token", new_access, req.cookies.user_id);
      //store the time the token was created
      mongo.databaseInsertion("token_created", Date.now(), req.cookies.user_id);
      //get liked artits from spotify
      const data = await getLikedArtists(new_access);
      //send liked artists to the front end
      res.status(200).json(data);
    }
    catch(error){
      console.error(error);
      res.status(500).send('An error occurred');
    }
  }
});

//delete the user's session when the front end calls this
//user logs off from front end
app.post('/logout', (req, res) => {
  //delete the user's tokens from the db
  mongo.databaseDeletion("access_token", req.cookies.user_id);
  //delete refresh token
  mongo.databaseDeletion("refresh_token", req.cookies.user_id);
  //delete timer
  mongo.databaseDeletion("token_created", req.cookies.user_id);
  //delete the user's cookie
  res.clearCookie('user_id');
  res.status(200).send('Logout successful');
  console.log("logout");
});

//to get the artists data
app.get('/concerts', (req, res) => {
  try{
  //get the parameter state and artist from the front end
  const state = req.body.state;
  const artist = req.body.artist;
  //get the user's id from the cookie
  getConcerts(artist, state).then( code => {
      //get the artist data
      getConcertDetails(code).then( data => {
        //send the data to the front end
        res.status(200).json(data);
      });
    
   } );
  }
  catch(e){
    console.log(e);
    res.status(500).send('An error occurred');
  }

});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
