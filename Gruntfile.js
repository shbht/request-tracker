"use strict";

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    "babel": {
      "options": {
        "sourceMap": true,
        "presets": ["babel-preset-es2015"]
      },
      "dist": {
        "files": [{
          "expand": true,
          "cwd": "lib/",
          "src": ["**/*.es6"],
          "dest": "dist/",
          "ext": ".js"
        }]
      }
    },
    "clean": [
      "dist/"
    ],
    "eslint": {
      "target": ["lib/**/*.es6", "Gruntfile.js"],
      "options": {
        "configFile": ".eslintrc"
      }
    },
    "watch": {
      "es6": {
        "files": ["lib/**/*.es6"],
        "tasks": ["babel:dist"]
      }
    },
    "jscs": {
      "src": "{<%= eslint.target %>}",
      "options": {
        "config": true,
        "esnext": true,
        "verbose": true,
        "fileExtensions": [".es6", ".js"]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-eslint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-jscs");

  // Default task.
  grunt.registerTask("default", [
    "build"
  ]);

  // Common build task
  grunt.registerTask("build", [
    "clean",
    "babel",
    "eslint",
    "jscs"
  ]);
};
