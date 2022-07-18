#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

npm install --prefix /auth
pm2 start npm --name authenticator --log /logs/authenticator.log --time -- --prefix /auth start