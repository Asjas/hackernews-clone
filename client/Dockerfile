FROM node:12.14.1-slim

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

CMD [ "yarn", "dev" ]
