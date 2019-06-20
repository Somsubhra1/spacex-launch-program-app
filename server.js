const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
