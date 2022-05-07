const { faker } = require("@faker-js/faker");

function test() {
  return {
    nombre: faker.commerce.product(),
    precio: parseInt(faker.commerce.price(0, 5000, 0)),
    thumbnail: faker.image.business(),
  }; 
}

module.exports = test;
