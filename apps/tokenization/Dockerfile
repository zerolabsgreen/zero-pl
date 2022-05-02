FROM node:lts-alpine
ENV NODE_ENV=production
ENV PORT=3333
EXPOSE 3333/tcp
WORKDIR /app
RUN apk --no-cache add bash
RUN yarn global add ts-node typescript
COPY ["./package.json", "./yarn.lock", "./"]
RUN yarn install
COPY . .

CMD /bin/bash -c "yarn migrate && node ./main.js"
