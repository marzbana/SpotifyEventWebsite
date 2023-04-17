// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  mongoDB_API: process.env.REACT_APP_mongoDB_API,
  spotify_client_id: process.env.REACT_APP_spotify_client_id,
};