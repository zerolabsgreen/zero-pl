FROM node:lts-alpine
ENV NODE_ENV=production
ENV FILES_STORAGE=/uploaded-files
VOLUME ["/tmp"]
WORKDIR /app
RUN yarn global add prisma@3.6.0
COPY ["./package.json", "./yarn.lock", "./"]

# Needed to make PhantomJS run in Docker
RUN apk update && apk add --no-cache wget && apk --no-cache add openssl wget && apk add ca-certificates && update-ca-certificates
RUN wget -qO- "https://github.com/dustinblackman/phantomized/releases/download/2.1.1a/dockerized-phantomjs.tar.gz" | tar xz -C / \
    && npm config set user 0 \
    && npm install -g phantomjs-prebuilt
RUN apk add --update ttf-dejavu ttf-droid ttf-freefont ttf-liberation && rm -rf /var/cache/apk/*

RUN yarn install
COPY . .
RUN prisma generate
RUN rm -rf /tmp/*

CMD /bin/sh -c "prisma migrate deploy && node ./main.js"
