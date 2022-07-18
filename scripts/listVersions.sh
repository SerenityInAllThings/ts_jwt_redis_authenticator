#!/bin/bash

AWS_PROFILE=petersonv aws s3 ls s3://code-build-versions/authenticator/ | awk '{ print $NF }'