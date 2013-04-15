#!/bin/bash
npm install
touch Procfile && touch .gitignore && touch .npmignore
###
cat > .npmignore << EOF
node_modules
test
EOF
###
zsh <<< '> Procfile <<< "web: node app.js"'

#git stuff
git init
cat > .gitignore << EOF
lib-cov
*.seed
*.log
*.csv
*.dat
*.out
*.pid
*.gz

pids
logs
results

npm-debug.log
node_modules
test
EOF
###
git add .

