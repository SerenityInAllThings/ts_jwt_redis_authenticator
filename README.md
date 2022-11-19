# Authenticator

User/password authenticator, emits JWTs and uses Redis for storage. Encryption keys are stored using [KMS](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html).

## Development

Some package.json scripts are available to help with the app lifecyle.

- `yarn build`: builds the app. 
- `yarn build:watch`: builds the app in watch mode. useful for development.
- `yarn start`: starts the app. 
- `yarn build:watch`: starts the app in watch mode. useful for development.
- `yarn redis-start-local`: starts a docker container running redis. Used for local development. Will save persistence in local `scripts/storage` folder.
- `yarn current-version`: will print the current app version. Mostly used for CI purposes.

### Publishing new versions

The project uses [AWS's Code Build](https://aws.amazon.com/codebuild/) to build and publish new versions of the app. The buildspec.yml file contains the build instructions. A helper script is available to start new publishes in the `scripts` folder, the usage is:

- `./buildVersion.sh BRANCHNAME`.

### Deploying versions

After publishing the version it should be deployed to be available for usage. The project uses [AWS's Code Deploy](https://aws.amazon.com/codedeploy/) to deploy new versions. The appspec.yml file contains the deployment instructions. A helper script is available to start new deployments in the `scripts` folder, the usage is:

- `./deployVersion.sh VERSION_NUMBER`. where VERSION_NUMBER is the package.json version number of the version to be deployed.

## Keys

This project uses [KMS](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html) to store RSA 2048 keys.

## TODOS

- Publish a library to easily verify JWT tokens
  - This would be used by other services to verify the tokens emitted by this service
- Add a way to change the password of a user
- Add a way to delete a user
- Add password minimum requirements
- Add password recovery