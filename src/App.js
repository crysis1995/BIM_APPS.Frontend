import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/Loader";

// Containers
const Layout = React.lazy(() => import("./Layout"));

function App() {
      return (
            <BrowserRouter basename="/bim_apps">
                  <React.Suspense fallback={<Loader/>}>
                        <Switch>
                              <Route
                                    path="/"
                                    name="Home"
                                    component={Layout}
                              />
                        </Switch>
                  </React.Suspense>
            </BrowserRouter>
      );
}

export default App;
