// Import the necessary modules
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Set the port number, use either the environment variable PORT or default to 3001
const PORT = process.env.PORT || 3001;
// Create an instance of an Express app
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the defined routes for the app
app.use(routes);

// Once the database connection is open, start the server and listen on the chosen port
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`now listening at http://localhost:${PORT}/`);
  });
});
