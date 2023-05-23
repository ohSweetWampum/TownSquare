// Configuring the connection to the MongoDB database
const { connect, connection } = require("mongoose");

// Database connection string. It uses the MongoDB URI from the environment variable, or defaults to a local database.
const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/townsquareDB";

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("You're connected");
module.exports = connection;
