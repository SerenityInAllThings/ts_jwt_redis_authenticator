#!/bin/bash

## Usage buildVersion.sh branchName
AWS_PROFILE=petersonv aws codebuild start-build --project-name authenticator --source-version $1 --environment-variables-override name='BRANCH',value="$1"