const { knex } = require("../db/mySQL/db.knex.js");

class Products {
  async createTable() {
    try {
      const existing = await knex.schema.hasTable("products");
      if (!existing) {
        await knex.schema.createTable("products", (table) => {
          table.string("title", 100).notNullable(),
            table.integer("price").notNullable(),
            table.string("thumbnail", 100).notNullable();
        });
        console.log("tabla creada😸");
      } else {
        console.log("La tabla ya existe ⛔");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async setProduct(product) {
    try {
      await knex.insert(product).from("products");
      console.log("producto agregado ✔️");
    } catch (error) {
      console.log(error);
    }
  }
  async getProducts() {
    try {
      const products = await knex.select().from("products");
      return products;
    } catch (e) {
      console.error("Uh-oh:", e.message);
    }
  }
}

const db = new Products();
module.exports = {
  db,
};
