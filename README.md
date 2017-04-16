# request-tracker

This application exposes three endpoints:

1. Get: /api/request/:connId/:timeout. eg.: http://localhost:8020/api/request/1/80

This will run the request for given connection id for given time period.

2. Get: /api/serverStatus

This will return the current status of requests running at server. eg.: {"1":69,"2":77}

3. Put: /api/kill (connection id in payload, eg.: {connId: 2})

This will kill the request for given connection id. Response for this request will be {status: ok}, while response
for request at given connection id will be {status: killed}.

## Node version

    4.4.4

## Setup

1. Check the npm packages:

    ```
    npm install
    ```

2. Create build:

    ```
    grunt
    ```

2. Start the application

    ```
    node dist/api.js
    ```

## Managing the project with Grunt

* Runs eslint, babel:dist

    ```
    grunt
    ```

* Compiles the .es6 files to .js

    ```
    grunt babel:dist
    ```

Server will start at port : 8020

healthcheck url: http://localhost:8020/api/healthcheck

request url: http://localhost:8020/api/request/:connId/:timeout

server-status url: http://localhost:8020/api/serverStatus

kill url: http://localhost:8020/api/kill (send connId in request body, json format, eg: {connId: 2})
