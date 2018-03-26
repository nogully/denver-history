module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/publications',
    useNullAsDefault: true
  }, 
  test: {
    client: 'pg',
    connection: 'postgres://localhost/denver_history_test',
    useNullAsDefault: true
  }
};