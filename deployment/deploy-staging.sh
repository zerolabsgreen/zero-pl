#!/bin/bash
rm -Rf dist
yarn build:docker

heroku container:login

# Auto-backup the database
heroku pg:backups:capture -a zero-api-staging
heroku pg:backups:capture -a zero-tokenization-staging

# Turn maintenance ON
heroku maintenance:on -a zero-ui-staging
heroku maintenance:on -a zero-api-staging
heroku maintenance:on -a zero-tokenization-staging

# UI
docker tag zero-pl-frontend registry.heroku.com/zero-ui-staging/web
docker push registry.heroku.com/zero-ui-staging/web
heroku container:release web -a zero-ui-staging
docker rmi registry.heroku.com/zero-ui-staging/web

# API
docker tag zero-pl-backend registry.heroku.com/zero-api-staging/web
docker push registry.heroku.com/zero-api-staging/web
heroku container:release web -a zero-api-staging
docker rmi registry.heroku.com/zero-api-staging/web

# Tokenization
# Note: heroku boot timeout has to be bumped to max value
docker tag zero-pl-tokenization registry.heroku.com/zero-tokenization-staging/web
docker push registry.heroku.com/zero-tokenization-staging/web
heroku container:release web -a zero-tokenization-staging
docker rmi registry.heroku.com/zero-tokenization-staging/web

# Turn maintenance OFF
heroku maintenance:off -a zero-tokenization-staging
heroku maintenance:off -a zero-api-staging
heroku maintenance:off -a zero-ui-staging