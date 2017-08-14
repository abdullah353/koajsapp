[![Build Status](https://travis-ci.org/mabdullah353/koajsapp.svg?branch=master)](https://travis-ci.org/mabdullah353/koajsapp)

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

This will run all test cases for once.

### Gulp **liveBuild** task.

This will keep an eye on JS file changes and rerun all testcases.