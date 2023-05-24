// Import necessary packages/modules
const router = require("express").Router(); // Express Router to separate route handling
const apiRoutes = require("./api"); // Importing api routes (that's where all routes are bundled together)

// All api routes are prepended with '/api' to organise url paths
router.use("/api", apiRoutes);

// Middleware for handling requests to any non-API routes
// If no API routes are hit, this code block runs sending an error message
router.use((req, res) => res.send("Wrong route!"));

// Export the router to be used in other parts of the application
module.exports = router;
