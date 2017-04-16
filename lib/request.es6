"use strict";

import Q from "q";

export class Request {

  constructor() {
    this.requestMap = new Map();
  }

  delay(connId, timeout) {
    let deffered = Q.defer(),
      timeStamp = new Date().getTime();

    this.requestMap.set(Number(connId), {deffered, timeStamp, timeout});

    setTimeout(() => {
      if (deffered.promise.isPending()) {
        console.log(`request completed after ${timeout} delay for connection id ${connId}`);
        deffered.resolve({"status": 200, "msg": {"status": "ok"}});
      } else {
        console.log(`No promise to resolve after delay for connection id ${connId}`);
      }
    }, timeout * 1000);

    return deffered.promise;
  }

  getRequest(req, res) {
    let {connId, timeout} = req.params;

    console.log(`new get request recevied for connection id ${connId} and request timeout ${timeout}`);

    if (this.requestMap.has(Number(connId))) {
      console.log(`request is already running for connection id ${connId}`);
      return res.status(200).send({"status": "already running"});
    }

    this.delay(connId, timeout)
      .then(result => {
        let {status, msg} = result;

        console.log(`request resolved for connection id ${connId}`);

        this.requestMap.delete(Number(connId));
        res.status(status).send(msg);
      })
      .catch(err => {
        console.log("Error in request method ", err);
        res.status(500).send({"status": "error", "msg": "Internal Server Error."});
      });
  }

  getServerStatus(req, res) {

    console.log(`get request recevied for server status`);

    let serverStatus = {};

    for (let [key, value] of this.requestMap) {
      serverStatus[key] = Math.floor(value.timeout - ((new Date().getTime() - value.timeStamp) / 1000));
    }

    console.log(`server status: ${JSON.stringify(serverStatus)}`);

    res.status(200).send(serverStatus);
  }

  killRequest(req, res) {
    let {connId} = req.body,
      {deffered} = this.requestMap.has(Number(connId)) ? this.requestMap.get(Number(connId)) : {"deffered": null};

    console.log(`put request recevied to kill connection id ${connId}`);

    if (deffered && deffered.promise.isPending()) {
      console.log(`killing request at connection id ${connId}`);
      deffered.resolve({"status": 200, "msg": {"status": "killed"}});
      res.status(200).send({"status": "ok"});
    } else {
      console.log(`request not found at connection id ${connId}`);
      res.status(404).send({"status": "invalid", "connectionId": connId});
    }
  }
}
