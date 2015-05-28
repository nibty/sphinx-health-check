var SPHINX_HOST = "localhost";
var SPHINX_PORT = 3312;
var CHECK_DELAY = 5000;
var HEALTH_CHECK_PORT = 3000;
var status;

var SphinxClient = require ("sphinxapi");
var express = require('express');

// Middleware
var app = express();
app.listen(HEALTH_CHECK_PORT);
app.set('view engine', 'ejs');

// Listen to health check calls
app.get("/", function(req, res) {
    if (status) {
        res.send("pass");
    } else {
        res.send("failed")
    }
});

// Listen to all other calls
app.get("*", function(req, res) {
    res.send("bad route");
});

// Run sphinx checks
runSphinxChecks();

/**
 * Run repeating sphinx checks
 */
function runSphinxChecks() {
    var index = 0;
    setInterval(function(){
        sphinxCheck();
        index++;
    }, CHECK_DELAY)
}

/**
 * Run query on sphinx
 */
function sphinxCheck() {
    console.log("sphinxCheck")
    var cl = new SphinxClient();
    cl.SetServer(SPHINX_HOST, SPHINX_PORT);

    cl.Query('test', function(err, result) {
        status = (!err && result != null && result.total_found > 0);
        console.log("status: " + status
        );
    });
}