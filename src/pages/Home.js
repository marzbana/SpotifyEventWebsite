import React from 'react';
import { Link } from 'react-router-dom';
function Home() {
  const location = window.location;
  const params = new URLSearchParams(location.search);
  const loggedIn = params.get('loggedIn');
  if(loggedIn === 'false' || loggedIn === null) {
  return (
    <div>
      <div style={{position: 'absolute', top: 0, right: 0}}>
        <Link to="/login"><button>Login</button></Link>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Link to='/search?loggedIn=false'><button>Search</button></Link>
      </div>
    </div>
  );
}
else {
  return (
    <div>
      <div style={{position: 'absolute', top: 0, right: 0}}>
        <Link to="/logout"><button>Log Out</button></Link>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Link to='/search?loggedIn=true'><button>Search</button></Link>
      </div>
    </div>
  );
}
}

export default Home;