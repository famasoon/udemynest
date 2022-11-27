FROM node:18-bullseye

WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .

CMD yarn run start:dev