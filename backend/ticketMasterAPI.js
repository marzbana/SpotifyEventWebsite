//import keys
const { ticketMaster_key } = require("../src/Config/config.js");
var request = require("request");
const api_key = ticketMaster_key;
const redirectUri = "http://localhost:3000/ticketMaster";

// Gets events of Artists in a certain state using state code
async function getConcerts(artistName, state) {
  const url =
    "https://app.ticketmaster.com/discovery/v2/events.json?apikey=1DVZAAGM3nezlDeuJRagtmAeNLd5HLLo&keyword=" +
    encodeURIComponent(artistName) +
    "&sort=date,asc&stateCode=" +
    state;
  console.log(url);

  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}

//Returns the concert images in the form of an array for an event
function getConcertImages(eventID) {
  var request = require("request");
  var options = {
    method: "GET",
    url:
      "https://app.ticketmaster.com/discovery/v2/events/" +
      eventID +
      "?apikey=1DVZAAGM3nezlDeuJRagtmAeNLd5HLLo&locale=*",
    headers: {},
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    return response.body;
  });
}

//Details of the concert, also happens to include concert images
async function getConcertDetails(eventID) {
  var request = require("request");
  const url =
    "https://app.ticketmaster.com/discovery/v2/events/" +
    eventID +
    "?apikey=1DVZAAGM3nezlDeuJRagtmAeNLd5HLLo&locale=*";
  fetch(url, {
    method: "GET",
    headers: {},
  }).then((response) => {
    return response.body;
  });
}

module.exports = { getConcertDetails, getConcerts };
