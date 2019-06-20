const express = require("express");
const graphqlHTTP = require("express-graphql");

const app = express();

// Middleware for graphql
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
