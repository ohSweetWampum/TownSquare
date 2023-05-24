// Configuring the connection to the MongoDB database
const { connect, connection } = require("mongoose");

// Database connection string. It uses the MongoDB URI from the environment variable, or defaults to a local database.
const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/townsquareDB";

// Use the connect method from mongoose to establish a connection to the MongoDB database
connect(connectionString, {
  useNewUrlParser: true, // To use the new MongoDB driver's new URL string parser
  useUnifiedTopology: true, // To use the new Server Discover and Monitoring engine
});
console.log("You're connected");
module.exports = connection;
