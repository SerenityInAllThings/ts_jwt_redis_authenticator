# Authenticator

User/password authenticator, emits JWTs and uses Redis for storage.

## Development

Some package.json scripts are available to help with the app lifecyle.

- `yarn build`: builds the app. 
- `yarn build:watch`: builds the app in watch mode. useful for development.
- `yarn start`: starts the app. 
- `yarn build:watch`: starts the app in watch mode. useful for development.
- `yarn redis-start-local`: starts a docker container running redis. Used for local development. Will save persistence in local `scripts/storage` folder.
- `yarn current-version`: will print the current app version. Mostly used for CI purposes.

## TODOS

- redis server persistence