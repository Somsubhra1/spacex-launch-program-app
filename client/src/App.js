import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./App.css";
import logo from "./logo.png";
import Launches from "./components/Launches";

// Creating client
const client = new ApolloClient({
    uri: "/graphql"
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="container">
                <img
                    src={logo}
                    alt="SpaceX logo"
                    style={{ width: 300, display: "block", margin: "auto" }}
                />
                <Launches />
            </div>
        </ApolloProvider>
    );
}

export default App;
