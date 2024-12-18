
# Todo project

Simple backend on NodeJS Express with REST API and Sequelize ORM with PostgreSQL database

## Run Locally

### Configuration

Firstly, make sure you have [docker](https://docs.docker.com/engine/install/) installed and it's working properly

Then, to copy project run

```bash
git clone https://github.com/pereletskii/todo-project.git
cd todo-project
```

There are few configurations you need to set before further actions

Create .env file for docker

```bash
touch .env
```

And put POSTGRES_PASSWORD and POSTGRES_USER variables in it

It should look like this

```env
POSTGRES_PASSWORD='my_password'
POSTGRES_USER='my_user'
```

You also need to create config file for project

```bash
touch ./todolist/env_config.json
```

It should look like this

```json
{
  "development": {
    "username": "user",
    "password": "password",
    "database": "user",
    "host": "db",
    "dialect": "postgres"
  },
  "test": {
    "username": "user",
    "password": "password",
    "database": "user",
    "host": "db",
    "dialect": "postgres"
  },
  "production": {
    "username": "user",
    "password": "password",
    "database": "user",
    "host": "db",
    "dialect": "postgres"
  },
  "port": 3000,
  "jwt_access_token": "your_token"
}
```

You can generate your own JWT access token [here](https://jwtsecret.com/)

### Docker

After you set all configurations

Run

```bash
docker compose up
```

Docker will create postgresql container with previously mentioned user and also create database named after this user

After docker containers are up and working properly

Run

```bash
docker exec -it todolist-app npx sequelize-cli db:migrate --config env_config.json
```

This will create all necessary database tables and links for proper server work

## API

All requests listened on address `0.0.0.0:3000`

Swagger UI will be added soon