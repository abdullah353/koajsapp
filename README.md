[![Build Status](https://travis-ci.org/mabdullah353/koajsapp.svg?branch=master)](https://travis-ci.org/mabdullah353/koajsapp) 
[![Coverage Status](https://coveralls.io/repos/github/mabdullah353/koajsapp/badge.svg?branch=master)](https://coveralls.io/github/mabdullah353/koajsapp?branch=master) [![npm](https://img.shields.io/npm/v/npm.svg)]() [![David](https://img.shields.io/david/expressjs/express.svg)]()[![David](https://img.shields.io/david/dev/expressjs/express.svg)]()

# Installing.

clone this repository and run npm install.

```bash
git clone https://github.com/mabdullah353/koajsapp.git
cd koajsapp
npm install
```

# Database Configuration.

To configure database connector edit `config/database.json`, This repository is using `sequelize` and `sequelize-cli`
to manage database.

### Creating Users Table Migrations.

`mg:create` and `mg:run` are shortcuts for version `sequelize migration:create` and `sequelize db:migrate`respectively.

```bash
// This will create migration in ./database/migrations folder
npm run  mg:create create_users_table

// This will run all pending migrations into configured database.
npm run  mg:run
```

# Development Work flow.

To start your development work flow use gulp `default` task.

### Gulp **default** tasks lifecycle.

run the gulp default task as shown:

```bash
// when gulp is not installed globaly
npm run gulp

// when gulp is installed globaly
gulp
```

Default task will perform the following operations in order.

1. Run all test cases.
2. Watch all js for changes, If Js file changed then it will rerun all test cases automatically.
3. Launch server on port 8082.
4. In case of server failure or any file change then the server will get refreshed automatically.

### Gulp **nodemon** task.

This task will keep our server running as Daemons. Also on any file changes it will get refreshed automatically.

### Gulp **tests** task.

This will run all test cases and generate code coverage using `istanbul`.

### Gulp **liveBuild** task.

This will keep an eye on JS file changes and rerun `less`, `tests`, `linter` and `nodemon` tasks.

### Gulp **linter** task.

This will run eslint script and identify errors on code styles.

### Gulp **coveralls** task.

It will update coveralls.io with code coverage.

### Gulp **less** task.

It will compile any less files into css file, and place it in public/css folder.

# Environment Variables.

Following are the environment variables that can control flow of application.

1. PORT (default 8080 number)
2. HOST (default localhost string)
3. NODE_ENV (default development string)
4. LOGGER_LEVEL (default info string)
5. LOGGER_ENABLED (default true string)

# To Make application Daeomon.

Npm start will run the gulp nodemon task and it make sure application will keep running.

```bash
npm start
```

# Docker

In root of the pakage their is Dockerfile. so to build an docker instance you can use the following command.

```bash
# clone repository.
git clone https://github.com/mabdullah353/koajsapp.git
cd koajsapp

# Build the image.
docker build -t mabdullah353:koajsapp .

# Chek all images.
docker images

# Run the image.
docker run -w /koajsapp -p 8080:8080 -d mabdullah353:koajsapp
```

visit [http://localhost:8080](http://localhost:8080)
