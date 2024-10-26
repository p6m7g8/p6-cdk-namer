#!/bin/bash

tgz=$(
  cd dist/js
  ls -1
)

tar -xzf dist/js/$tgz
rm -rf package/node_modules
tar -czf dist/js/$tgz package
rm -rf package
tar -tzf dist/js/$tgz
