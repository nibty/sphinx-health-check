# sphinx-health-check
A node.js daemon that accepts HTTP requests and performs health checks on Sphinx searchd.
This was written to work well with haproxy or other load balancers. It preforms only one health check
at a time and serves a cluster of boxes the same result.

## Install ##
npm install

Modify settings in app.js

## Run ##
node app.js
