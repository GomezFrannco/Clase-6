/**
 * file system node module import
 */
// const fs = require("fs");

/**
 *  Data controller
 */
// class DataController{
//   constructor() {
//     this.dir = "./src/data/products.json";
//   }
//   async createFile(content) {
//     try {
//       await fs.promises.writeFile(this.dir, JSON.stringify(content));
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   async save(product) {
//     let products = [];
//     try {
//       const dataContent = await fs.promises.readFile(this.dir, "utf-8");
//       products = JSON.parse(dataContent);
//     } catch (e) {}
//     products.push(product);
//     try {
//       await this.createFile(products);
//     } catch (e) {}
//   }
//   read() {
//     const data = JSON.parse(fs.readFileSync(this.dir, "utf8"));
//     return data;
//   }
// }
/**
 *  Export class
 */
// module.exports = {
//   Data: DataController 
// };
