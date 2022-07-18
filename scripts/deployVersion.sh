#!/bin/bash

# Usage ./deployVersion VERSION_NUMBER
AWS_PROFILE=petersonv aws deploy create-deployment --application-name authenticator --deployment-group-name authenticator_dg --s3-location bucket=code-build-versions,key=authenticator/${1}/build.zip,bundleType=zip