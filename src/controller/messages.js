const { knex } = require("../db/SQLite/db.knex.js");

class Messages {
  async createTable() {
    try {
      const existing = await knex.schema.hasTable("messages");
      if (!existing) {
        await knex.schema.createTable("messages", (tableBuilder) => {
          tableBuilder.string("email", 100).notNullable(),
            tableBuilder.string("date", 100).notNullable(),
            tableBuilder.string("message", 200).notNullable();
        });
        console.log("Table has been created 😸");
      } else {
        console.log("Table has already been created ⛔");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async saveMessage(message) {
    try {
      await knex.insert(message).from("messages");
      console.log("mensaje guardado ✔️");
    } catch (err) {
      console.log(err);
    }
  }
  async readMessages() {
    try {
      const message = await knex.select().from("messages");
      return message;
    } catch (err) {
      console.log(err);
      return { messages: "no messages yet" };
    }
  }
}

const dbLite = new Messages();
module.exports = {
  dbLite,
};
