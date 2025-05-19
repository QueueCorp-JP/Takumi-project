#!/bin/bash
# Fix permissions and run build
chmod +x node_modules/.bin/webpack
chmod +x node_modules/.bin/webpack-cli
npm run build 