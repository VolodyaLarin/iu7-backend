const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./sqlRepositories/databases/dev-tests.sqlite3",
  },
  useNullAsDefault: true
};

export default knexConfig;
