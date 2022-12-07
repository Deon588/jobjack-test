FROM node:12-alpine

RUN npm install
RUN npm run prebuild
RUN npm run build
COPY ./node_modules /usr/src/service/node_modules
COPY ./dist /usr/src/service/dist
COPY ./resources /usr/src/service/resources
WORKDIR /usr/src/service
RUN apk add --no-cache bash
RUN apk add --no-cache openssl


RUN apk add --no-cache tzdata
ENV TZ=Africa/Johannesburg
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


WORKDIR /usr/src/service/dist
RUN chown -R node:node /usr/src/service/
RUn chmod a+x /usr/src/service/dist/main.js
USER node

CMD ["node", "./main.js"]