[![Build Status](https://travis-ci.org/mabdullah353/koajsapp.svg?branch=master)](https://travis-ci.org/mabdullah353/koajsapp) 
[![Coverage Status](https://coveralls.io/repos/github/mabdullah353/koajsapp/badge.svg?branch=master)](https://coveralls.io/github/mabdullah353/koajsapp?branch=master)

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

This will keep an eye on JS file changes and rerun 'tests', 'linter' and 'nodemon' tasks.

### Gulp **linter** task.

This will run eslint script and identify errors on code styles.

### Gulp **coveralls** task.

It will update coveralls.io with code coverage.