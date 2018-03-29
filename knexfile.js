module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/denver_history',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/denver_history_test',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/test',
    },
  },
  production: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL} ?ssl=true`,
    migrations: {
      directory: './db/migrations',
    },
    useNullAsDefault: true,
    seeds: {
      directory: './db/seeds/production',
    },
  },
};
