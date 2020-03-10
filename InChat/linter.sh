#!/bin/bash

# Linting of source files for GCP Firebase functions
node_modules/eslint/bin/eslint.js functions/
jshint functions/

# Linting of testing files for GCP Firebase functions
node_modules/eslint/bin/eslint.js functions_tests/
jshint functions_tests/
