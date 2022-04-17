const config = {
    client: "better-sqlite3",
    connection: {
      filename: "./src/db/SQLite/messages.sqlite",
    },
    useNullAsDefault: true,
};

module.exports = {
  config
}