FROM mhart/alpine-node

ADD ./dist /app/dist
ADD ./src /app/src
ADD ./config /app/config
ADD ./package.json /app/package.json

WORKDIR /app

RUN apk update
RUN apk add git python make
RUN npm i

CMD npm run deploy
