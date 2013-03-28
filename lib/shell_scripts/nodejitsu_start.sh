#!/bin/bash
 
touch .npmignore
 
cat > .npmignore << EOF
node_modules
test
EOF
 
npm install
 
jitsu login
jitsu deploy
 