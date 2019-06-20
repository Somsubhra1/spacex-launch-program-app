import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import logo from "./logo.png";
import Launches from "./components/Launches";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Launch from "./components/Launch";

// Creating client
const client = new ApolloClient({
    uri: "/graphql" // query uri
});

function App() {
    return (
        // ApolloProvider is the wrapper to components which use the query
        <ApolloProvider client={client}>
            <Router>
                <div className="container">
                    <img
                        src={logo}
                        alt="SpaceX logo"
                        style={{ width: 300, display: "block", margin: "auto" }}
                    />
                    <Route exact path="/" component={Launches} />
                    <Route
                        exact
                        path="/launch/:flight_number"
                        component={Launch}
                    />
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
