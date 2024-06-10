import express from "express";
import * as RED from 'node-red';
import http from 'http';



// Create the settings object - see default settings.js file for other options
const settings = {
  httpAdminRoot:"/red",
  httpNodeRoot: "/api",
  userDir:"./data/node-red/",
  functionGlobalContext: { }    // enables global context
};

export function initNodeRed(server: http.Server, app: express.Express) {

var nodered = express.Router();
// Initialise the runtime with a server and settings
RED.init(server, settings);

// Serve the editor UI from /red
nodered.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
nodered.use(settings.httpNodeRoot,RED.httpNode);

app.use(nodered);

// Start the runtime
RED.start();

}
