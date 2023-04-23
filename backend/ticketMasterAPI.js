//import keys
const {ticketMaster_key} = require('../src/Config/config.js');

const api_key = ticketMaster_key;
const redirectUri = 'http://localhost:3000/ticketMaster';



// Gets events of Artists in a certain state using state code
function getConcerts(artistName, state) {
    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=1DVZAAGM3nezlDeuJRagtmAeNLd5HLLo\n&keyword=' + artistName +"&sort=date,asc&stateCode=" + state,
      'headers': {
      }
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
    
    return response.body;
}


//Returns the concert images in the form of an array for an event
function getConcertImages(eventID) {
    var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'https://app.ticketmaster.com/discovery/v2/events/' + eventID + '?apikey=1DVZAAGM3nezlDeuJRagtmAeNLd5HLLo&locale=*',
        'headers': {
        }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    return response.body;
    });
}

//Details of the concert, also happens to include concert images
function getConcertDetails(eventID) {
    var request = require('request');
    var options = {
    'method': 'GET',
    'url': 'https://app.ticketmaster.com/discovery/v2/events/' + eventID + '?apikey=1DVZAAGM3nezlDeuJRagtmAeNLd5HLLo&locale=*',
    'headers': {
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    return response.body;
    });
}
