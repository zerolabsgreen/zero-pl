#!/bin/bash
rm -Rf dist
yarn build:docker

heroku container:login

# UI
docker tag zero-pl-frontend registry.heroku.com/zero-ui-app/web
docker push registry.heroku.com/zero-ui-app/web
heroku container:release web -a zero-ui-app
docker rmi registry.heroku.com/zero-ui-app/web

#API
docker tag zero-pl-backend registry.heroku.com/zero-api-app/web
docker push registry.heroku.com/zero-api-app/web
heroku container:release web -a zero-api-app
docker rmi registry.heroku.com/zero-api-app/web

#Issuer
# Note: heroku boot timeout has to be bumped to max value
docker tag zero-pl-issuer-api registry.heroku.com/zero-issuer-api-app/web
docker push registry.heroku.com/zero-issuer-api-app/web
heroku container:release web -a zero-issuer-api-app
docker rmi registry.heroku.com/zero-issuer-api-app/web