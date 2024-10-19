#!/bin/sh

if [ ! -f "dist/index.js" ] || [ ! -f "dist/index.d.ts" ]; then
    npm run build
fi

# Run 'npm run example' afterwards
npx ts-node example/example.ts