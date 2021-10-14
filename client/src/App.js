import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

function App() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <>
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
