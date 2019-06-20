const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require("graphql");
const axios = require("axios");

// Launch Type
const LaunchType = new GraphQLObjectType({
    name: "Launch",
    fields: () => ({
        flight_number: { type: GraphQLInt },
        mission_name: { type: GraphQLString },
        launch_year: { type: GraphQLString },
        launch_date_local: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        rocket: { type: RocketType } // relation between two schemas
    })
});

// Rocket type
const RocketType = new GraphQLObjectType({
    name: "Rocket",
    fields: () => ({
        rocket_id: { type: GraphQLString },
        rocket_name: { type: GraphQLString },
        rocket_type: { type: GraphQLString }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        launches: {
            // Main array of data
            type: new GraphQLList(LaunchType), // List type
            resolve(parent, args) {
                // no args
                return axios
                    .get("https://api.spacexdata.com/v3/launches") // url to fetch from
                    .then(res => res.data);
            }
        },
        launch: {
            type: LaunchType, // single data so no list type
            // Argument to find the specific launch:
            args: {
                flight_number: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return axios
                    .get(
                        `https://api.spacexdata.com/v3/launches/${
                            args.flight_number
                        }`
                    )
                    .then(res => res.data);
            }
        },
        rockets: {
            // Main array of data
            type: new GraphQLList(RocketType), // List type
            resolve(parent, args) {
                // no args
                return axios
                    .get("https://api.spacexdata.com/v3/rockets") // url to fetch from
                    .then(res => res.data);
            }
        },
        rocket: {
            type: RocketType,
            // Argument to find the specific launch:
            args: {
                rocket_id: { type: GraphQLString }
            },
            resolve(parent, args) {
                return axios
                    .get(
                        `https://api.spacexdata.com/v3/rockets/${
                            args.rocket_id
                        }`
                    )
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: RootQuery });
