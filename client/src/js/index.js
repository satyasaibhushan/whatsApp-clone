import React, { useState } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "../css/styles.css";
import Login from "./components/login";
import Chat from "./components/chat";

const App = () => {
  return (
    <Router>
    <div>
      hello
   
      <Route path="/" exact component={Login} />
      <Route path="/chat" component={Chat} />

    </div>
    </Router>
  );
}

render(<App />, document.getElementById("app"));
