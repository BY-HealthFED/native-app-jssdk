#!/bin/bash

set -e

yarn && yarn build:uat
scp -r ./build/* www@192.168.103.107:~/web/jssdk-2

# find ~/web/appeal-review -type f -mtime +0.5 -exec rm -f {} \;
