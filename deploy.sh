#!/bin/bash
yarn build
scp -r ./build/* www@192.168.103.107:~/web/appsdk
