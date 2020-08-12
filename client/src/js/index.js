import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "../css/styles.css";
import Login from "./components/login/login";
import Chat from "./components/chat/chat";
import Register from "./components/register/register"

const App = () => {
  return (
    <Router>
    <div>
   
      <Route path="/login" exact component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/chat" component={Chat} />

    </div>
    </Router>
  );
}

render(<App />, document.getElementById("app"));
