const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const path = require("path");

const app = express();

// CORS middleware
app.use(cors());

// Middleware for graphql
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === "production" ? false : true
    })
);

// Serve static assets if it's production environment
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
