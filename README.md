# Spotify Concert Finder

A web application that allows users to log in with their Spotify accounts, retrieve their followed artists, and discover upcoming concerts for those artists. This application integrates the Spotify API and Ticketmaster API to provide a seamless experience for music enthusiasts.

## Project Description

Spotify Concert Finder connects music fans with live performances by their favorite artists. By logging in with Spotify, users can view their followed artists and find upcoming concerts in a specified location. The project leverages OAuth2 for secure user authentication, Spotify's API to fetch artist data, and Ticketmaster's API to retrieve concert details.

## Tech Stack

- **Frontend**: React, React Router, Bootstrap
- **Backend**: Node.js, Express, MongoDB
- **APIs**: Spotify API, Ticketmaster API
- **Other Tools**: Cookie management, request-promise for API calls

## Setup and Installation

To run this project locally, follow these steps:

### Prerequisites
- Node.js and npm installed
- MongoDB instance running locally or accessible remotely
- Spotify Developer account and application set up
- Ticketmaster API key

### Instructions
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. **Install dependencies within the `src` folder**:
    npm install
3. **Create a `config.js` file in the `Config` folder.**
4. **Add the following:**

   ```javascript
   module.exports = {
     spotify_client: '<Your Spotify Client ID>',
     spotify_secret: '<Your Spotify Client Secret>',
     ticketMaster_key: '<Your Ticketmaster API Key>',
   };
5. **Start the backend server**:

```bash
node server.js
```
6. **Start the React application**:

```bash
npm start
```

7. **Navigate to `http://localhost:3000` in your browser.**

## Features

- **Spotify Authentication:** Secure login using Spotify OAuth2.
- **Artist Discovery:** View your followed artists on Spotify.
- **Concert Search:** Discover upcoming concerts for specific artists in a selected location.
- **Responsive Design:** Accessible on desktop and mobile devices.

## Demo

1. **Login with Spotify**
2. **View Followed Artists**
3. **Find Concerts**

## Challenges Faced

### OAuth2 Integration
Implementing OAuth2 with Spotify and ensuring secure token exchange was a challenging aspect of the project. I overcame this by thoroughly understanding the Spotify API documentation and testing edge cases for user authentication.

### API Integration
Combining data from Spotify and Ticketmaster required careful synchronization and error handling. I resolved this by modularizing the API calls and implementing robust error handling mechanisms.

## Future Enhancements

- Add user preferences for better concert recommendations.
- Support more APIs for a wider range of event data.
- Enhance UI/UX for better usability.