# ZeroProtocolLabs

## Install application

```shell
npm config set '//registry.npmjs.org/:_authToken' "<INSERT NPM READ TOKEN HERE>"
yarn
```

## Start development stack with Docker Compose:

The following will be started:

1. Main Postgres instance
2. Tokenization Postgres instance
3. Ganache

```shell
docker-compose -f docker-compose-dev.yaml up -d
```

You can start these processes manually one by one with parameters you can find in the `docker-compose-dev.yaml` file

## Update database schemas
To create/update database schemas execute the following:

```shell
yarn migrate:all
```

To reset database schemas and Ganache storage and recreate from scratch, execute the following:

```shell
docker-compose -f docker-compose-dev.yaml down -v
docker-compose -f docker-compose-dev.yaml up -d
sleep 5
yarn migrate:all
```


## Update Prisma ORM client

Usually, it is safe to regenerate Prisma client, especially after making changes to the schema or switching branches:

```shell
yarn db:migrate:generate
```

## Build app

```shell
yarn build
```

## Launch application

```shell
yarn start
```

To seed the system with sample data necessary to develop, execute the following. It will submit data to the system over
REST API and backend processes will save transactions on Ganache local chain

```shell
yarn seed:all:dev
```

## Receive email messages

The `docker-compose-dev.yaml` file contains `mailhog` service definition. This a mock SMTP server that allows you to
have insight into all email messages sent during development and testing. It exposes SMTP service on port 1025 and web
user interface on port 8025. Backend during development accesses it when the following is set in your .env
file: `SMTP_URL=smtp://localhost:1025`. To see emails sent, navigate to `http://localhost:8025/#`. SMTP mock service has
no data persistence, so you will lose all the email messages when it is restarted.

## Deployment to Heroku

Requires `heroku` command line tool

---

One time action:

```
heroku login
```
---
Make sure the latest `master` branch is built
```
yarn clean && yarn && yarn build
```

Deploy
```
bash deployment/maintenance-on.sh
bash deployment/deploy-heroku.sh
bash deployment/maintenance-off.sh
```
