import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import Auth from "screens/Auth";
import Dashboard from "screens/Dashboard";

// const PrivateData = lazy(() => import("./nodes/private"));
// const PublicData = lazy(() => import("./nodes/public"));

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

type RedirectableRouteProps = {
  isPublic?: boolean;
  children: JSX.Element;

  // FIXME
  exact?: any;
  path: any;
};

function RedirectableRoute({
  isPublic,
  children,
  ...rest
}: RedirectableRouteProps) {
  const isAuthenticated = localStorage.getItem("auth-key");

  const handeRedirect = () => {
    if (isPublic) return !isAuthenticated ? children : <Redirect to="/" />;
    return isAuthenticated ? children : <Redirect to="/auth" />;
  };

  return <Route {...rest} render={handeRedirect} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <RedirectableRoute exact path="/">
            <Dashboard />
          </RedirectableRoute>

          <RedirectableRoute isPublic path="/auth">
            <Auth />
          </RedirectableRoute>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
