#!/bin/bash

for package in packages/*; do
  if [ -d "$package" ]; then
    echo "Linking node_modules for $package"
    rm -rf "$package/node_modules"
    ln -s "$(pwd)/node_modules" "$package/node_modules"
  fi
done
