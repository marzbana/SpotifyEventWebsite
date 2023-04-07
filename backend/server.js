const express = require('express'); //Backend Framework
require = require('esm')(module /*, options */)
const { loginWithSpotify, getLikedArtists } = require('./SpotifyAPI.js');
// const {listDatabases,main} = require('./mongoDB.js');

const cors = require('cors');
const app = express();
app.use(cors());
const port = 8000;
const state = Math.random().toString(36).substring(2, 15);
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let token = [null, null];
let code = null;


const {MongoClient} = require('mongodb'); //Database

async function main() {
    //Connection URL info
      const uri = 'mongodb+srv://Jkwan:21323002448232@cluster0.dqni373.mongodb.net/test';
    const client = new MongoClient(uri);
    try {
      await client.connect();
      await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
      await client.close();
    }
  }


//Sample function to list the databases in the DB cluster
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  };
  


    
  module.exports = {
    listDatabases,
    main
  };



main().catch(console.error); //Call our main function to test the DB.


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
