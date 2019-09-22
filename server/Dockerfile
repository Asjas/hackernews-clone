FROM node:10.16.2-stretch

EXPOSE 4000

RUN apt update && apt install vim -y

ENV NODE_ENV production
ENV PRISMA_ENDPOINT "https://hackernews.asjas.co.za/prisma/hackernews/prod"
ENV PRISMA_SECRET "hY98DSFLKjasdh8890839r"
ENV PRISMA_MANAGEMENT_API_SECRET "hY98DSFLKjasdh8890839r"

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn

COPY . /app

RUN yarn build

RUN npx apollo service:push --endpoint=https://hackernews.asjas.co.za/prisma/hackernews/prod

CMD ["node", "dist/index.js"]
