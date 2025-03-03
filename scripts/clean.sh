#!/bin/bash

echo "Cleaning all node_modules, .turbo, and dist directories..."

# Find and remove directories
find . -name "node_modules" -type d -prune -exec rm -rf {} +
find . -name ".turbo" -type d -prune -exec rm -rf {} +
find . -name "dist" -type d -prune -exec rm -rf {} +

echo "Cleanup complete!"
