// Import necessary packages/modules
const router = require("express").Router(); // Express Router to separate route handling
const userRoutes = require("./userRoutes"); // Import routes for user related endpoints
const thoughtRoutes = require("./thoughtRoutes"); // Import routes for thought related endpoints

// When we visit /users, we use the routes set up in userRoutes
router.use("/users", userRoutes);

// When we visit /thoughts, we use the routes set up in thoughtRoutes
router.use("/thoughts", thoughtRoutes);

// Export the router to be used in other parts of the application
module.exports = router;
