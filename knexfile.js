module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/publications',
    useNullAsDefault: true, 
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }, 
  test: {
    client: 'pg',
    connection: 'postgres://localhost/denver_history_test',
    useNullAsDefault: true
  }
};