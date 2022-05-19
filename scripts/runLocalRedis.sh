#!/bin/bash

docker run --name authenticator_persistence -d -p 6379:6379 -v /workspace/pessoal/blog/authenticaticator/scripts/storage:/data redis redis-server --save 60 1 