//===========================================================================
//DEPENDENCIES
// Dependencies, these are the  npm packages that we would need to operate
// BodyParser makes it possible for our server to interpret data sent to it.
//===========================================================================
const express = require('express');
const bodyParser = require('body-parser');

//============================================================================
//CONFIGURING
//This is to set basic properties of our Express Server
//=============================================================================

// Tell node that I am creating an "express server"
// using const instead of "var"
const app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static('app/public'));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// This is again standard, we are setting the port...   
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});