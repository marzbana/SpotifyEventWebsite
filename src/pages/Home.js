import React from "react";
import { Link } from "react-router-dom";
import { checkCookie } from "./Cookie.js";
import "../CSS/Home.css";
function Home() {
  if (!checkCookie()) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Link to="/login/loggedIn=false">
            <button>Login</button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <Link to="/logout/loggedIn=true">
            <button>Log Out</button>
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Link to="/search/loggedIn=true">
            <button>Search</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
