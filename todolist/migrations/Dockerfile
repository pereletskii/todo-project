FROM node:18 AS build

WORKDIR /tmp
COPY ./ ./migrations
COPY ./env_config.json ./

RUN npm install sequelize sequelize-cli pg

CMD [ "npx", "sequelize-cli", "db:migrate", "--env", "production", "--config", "env_config.json" ]