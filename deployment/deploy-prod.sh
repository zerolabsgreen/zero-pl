#!/bin/bash
rm -Rf dist
yarn build:docker

heroku container:login

# Auto-backup the database
heroku pg:backups:capture -a zero-api-app
heroku pg:backups:capture -a zero-tokenization-app

# Tag docker images
docker tag zero-pl-tokenization registry.heroku.com/zero-tokenization-app/web
docker tag zero-pl-backend registry.heroku.com/zero-api-app/web
docker tag zero-pl-frontend registry.heroku.com/zero-ui-app/web

# Push docker images
docker push registry.heroku.com/zero-tokenization-app/web
docker push registry.heroku.com/zero-api-app/web
docker push registry.heroku.com/zero-ui-app/web

# Turn maintenance ON
heroku maintenance:on -a zero-ui-app
heroku maintenance:on -a zero-api-app
heroku maintenance:on -a zero-tokenization-app

# Release docker images
# Note: heroku boot timeout has to be bumped to max value
heroku container:release web -a zero-tokenization-app
heroku container:release web -a zero-api-app
heroku container:release web -a zero-ui-app

# Cleanup
docker rmi registry.heroku.com/zero-tokenization-app/web
docker rmi registry.heroku.com/zero-ui-app/web
docker rmi registry.heroku.com/zero-api-app/web

# Turn maintenance OFF
heroku maintenance:off -a zero-tokenization-app
heroku maintenance:off -a zero-api-app
heroku maintenance:off -a zero-ui-app