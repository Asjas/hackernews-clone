FROM node:10.16.2-stretch

EXPOSE 4000

RUN apt update && apt install vim -y

ENV NODE_ENV production
ENV PRISMA_ENDPOINT "https://hackernews.asjas.co.za/prisma/hackernews/prod"
ENV PRISMA_SECRET "hY98DSFLKjasdh8890839r"
ENV PRISMA_MANAGEMENT_API_SECRET "hY98DSFLKjasdh8890839r"

# Create work environment and set up app
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --production && yarn cache clean
COPY --chown=node:node . .

RUN yarn build

# RUN npx apollo service:push --endpoint=https://hackernews.asjas.co.za/prisma/hackernews/prod

CMD ["node", "dist/index.js"]
