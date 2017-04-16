# dipper-api


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
