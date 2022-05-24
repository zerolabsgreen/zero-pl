#!/bin/bash
rm -Rf dist
yarn build:docker

heroku container:login

# Auto-backup the database
heroku pg:backups:capture -a zero-api-app
heroku pg:backups:capture -a zero-tokenization-app

# UI
docker tag zero-pl-frontend registry.heroku.com/zero-ui-app/web
docker push registry.heroku.com/zero-ui-app/web
heroku container:release web -a zero-ui-app
docker rmi registry.heroku.com/zero-ui-app/web

# API
docker tag zero-pl-backend registry.heroku.com/zero-api-app/web
docker push registry.heroku.com/zero-api-app/web
heroku container:release web -a zero-api-app
docker rmi registry.heroku.com/zero-api-app/web

# Tokenization
# Note: heroku boot timeout has to be bumped to max value
docker tag zero-pl-tokenization registry.heroku.com/zero-tokenization-app/web
docker push registry.heroku.com/zero-tokenization-app/web
heroku container:release web -a zero-tokenization-app
docker rmi registry.heroku.com/zero-tokenization-app/web