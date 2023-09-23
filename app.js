// Import modules
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

// Import routers
const filesRouter = require("./routes/filesRouter");
const advertisementsRouter = require("./routes/advertisementsRouter");

// Initialize express app
var app = express();

// Apply middlewares
app.use(logger('dev')); // Logs request details
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded bodies
app.use(cookieParser()); // Parses cookies
app.use(cors()); // Enables CORS
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files

// Define routes
app.use("/files", filesRouter); // File-related routes
app.use("/advertisements", advertisementsRouter); // Advertisement-related routes

// Export app instance
module.exports = app;

