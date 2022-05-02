#!/bin/bash
heroku maintenance:on -a zero-ui-app
heroku maintenance:on -a zero-api-app
heroku maintenance:on -a zero-tokenization-app