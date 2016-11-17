FROM mhart/alpine-node

ADD . /app

WORKDIR /app

RUN npm install
RUN npm run deploy

CMD node index.js
