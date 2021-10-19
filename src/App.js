import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import './assets/scss/style.scss'
import Discover from "./pages/Discover";
import Detail from "./pages/Detail";
import Navigation from "./components/Navigation";

function App() {
  return (
      <Router>
        <div className="app-main-content">
          <Switch>
            <Route path="/discover/:categoryRouteId">
              <Discover />
            </Route>
            <Route path="/discover">
              <Discover />
            </Route>
            <Route path="/movie/:movieId">
              <Detail />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <Navigation />
      </Router>
  );
}

export default App;
