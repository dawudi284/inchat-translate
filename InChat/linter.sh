#!/bin/bash

# Linting of source files for GCP Firebase functions
jshint functions/index.js
jshint functions/user.functions.js

# Linting of testing files for GCP Firebase functions
jshint functions_tests/
