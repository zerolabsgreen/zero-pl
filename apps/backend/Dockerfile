FROM node:lts-alpine
ENV NODE_ENV=production
ENV FILES_STORAGE=/uploaded-files
VOLUME ["/tmp"]
WORKDIR /app
RUN yarn global add prisma@3.6.0
COPY ["./package.json", "./yarn.lock", "./"]
RUN yarn install
COPY . .
RUN prisma generate
RUN rm -rf /tmp/*

CMD /bin/sh -c "prisma migrate deploy && node ./main.js"
