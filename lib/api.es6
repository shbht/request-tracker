"use strict";

import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import moment from "moment";
import {Request} from "./request";

let {NODE_ENV} = process.env,
  nodeEnv = NODE_ENV || "local",
  config = Object.freeze(require("../config/" + nodeEnv)),
  urlPrefix = config.urlPrefix,
  port = config.http.port,
  app = express(),
  request = new Request();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.use(`${urlPrefix}/healthcheck`, (req, res) => {
  res.send("OK");
});

app.get(`${urlPrefix}/request/:connId/:timeout`, request.getRequest.bind(request));
app.get(`${urlPrefix}/serverStatus`, request.getServerStatus.bind(request));
app.put(`${urlPrefix}/kill`, request.killRequest.bind(request));

app.use(methodOverride);

app.listen(port, () => {
  console.log(`Server has started at datetime ${moment().format()} and is listening on port: ${port}`);

  process.on("uncaughtException", err => {
    console.log("uncaughtException", err);
  });
});
