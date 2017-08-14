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

## Creating Users Table Migrations.

`mg:create` and `mg:run` are shortcuts for version `sequelize migration:create` and `sequelize db:migrate`respectively.

```
// This will create migration in ./database/migrations folder
npm run  mg:create create_users_table

// This will run all pending migrations into configured database.
npm run  mg:run
```

