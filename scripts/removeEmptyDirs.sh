#!/bin/bash

# Get the directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Compute the target directory relative to the script's directory
TARGET_DIR="$SCRIPT_DIR/../dist/types"

# Remove empty directories recursively
find "$TARGET_DIR" -depth -type d -empty -delete