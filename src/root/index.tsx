import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Auth from "screens/Auth";
import Dashboard from "screens/Dashboard";

// const PrivateData = lazy(() => import("./nodes/private"));
// const PublicData = lazy(() => import("./nodes/public"));

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>

          <Route path="/auth">
            <Auth />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
