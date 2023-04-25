FROM --platform=linux/amd64 node:16-alpine
ENV NODE_ENV=production
ARG NPM_TOKEN
WORKDIR /app
RUN apk --no-cache add bash
RUN yarn global add ts-node typescript
COPY ["./package.json", "./yarn.lock", "./typeorm/ormconfig.ts", "./"]

RUN npm config set '//registry.npmjs.org/:_authToken' "$NPM_TOKEN"
RUN yarn install
COPY . .

CMD /bin/bash -c "yarn migrate && node ./main.js"
