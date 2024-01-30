// knexfile.js
module.exports = {
    client: 'sqlite3',
    connection: {
      filename: './apitec.sqlite' // Puedes cambiar el nombre del archivo si lo deseas
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  };