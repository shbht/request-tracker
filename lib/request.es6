"use strict";

import Q from "q";

export class Request {

  constructor() {
    this.requestMap = new Map();
  }

  delay({connId, timeout}) {
    let deffered = Q.defer(),
      timeStamp = new Date().getTime();

    this.requestMap.set(Number(connId), {deffered, timeStamp, timeout});

    setTimeout(() => {
      if (deffered.promise.isPending()) {
        deffered.resolve({"status": 200, "msg": {"status": "ok"}});
      } else {
        console.log("No promise to resolve after delay.");
      }
    }, timeout * 1000);

    return deffered.promise;
  }

  getRequest(req, res) {
    this.delay(req.params)
      .then(result => {
        let {status, msg} = result;

        res.status(status).send(msg);
      })
      .catch(err => {
        console.log("Error in request method ", err);
        res.status(500).send({"status": "error", "msg": "Internal Server Error."});
      });
  }

  getServerStatus(req, res) {
    let serverStatus = {};

    for (let [key, value] of this.requestMap) {
      serverStatus[key] = value.timeout - ((new Date().getTime() - value.timeStamp) / 1000);
    }

    res.status(200).send(serverStatus);
  }

  killRequest(req, res) {
    console.log("body ", req.body);

    let {connId} = req.body,
      {deffered} = this.requestMap.get(connId);

    if (deffered && deffered.promise.isPending()) {
      deffered.resolve({"status": 200, "msg": {"status": "killed"}});
      res.status(200).send({"status": "ok"});
    } else {
      res.status(404).send({"status": "invalid", "connectionId": connId});
    }
  }
}
