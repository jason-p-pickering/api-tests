FROM node:4.4.5-slim

ENV DOCKERIZE_VERSION v0.2.0

RUN apt-get update && apt-get install -y wget && npm install chakram --save-dev && npm install -g mocha

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ENV NODE_PATH /usr/local/lib/node_modules

WORKDIR /dhis2

COPY dhis2.js system-test/