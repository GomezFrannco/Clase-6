/**
 *  Server modules
 */
const express = require("express");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");
const { db } = require("./src/controller/products.js");
const { dbLite } = require("./src/controller/messages.js");
const apiRouter = require("./src/routes/api.routes.js");
const indexRouter = require("./src/routes/index.routes.js");
const sessionRouter = require("./src/routes/session.routes.js");

class App {
  constructor(port) {
    this.app = express();
    this.http = createServer(this.app);
    this.port = Number(port);
    this.io = new Server(this.http);
    this.viewEngine();
    this.settings();
    this.middlewares();
    this.socket();
    this.routes();
  }
  viewEngine() {
    this.app.engine(
      "hbs",
      engine({
        extname: "hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/src/public/views/layouts",
        partialsDir: __dirname + "/src/public/views/partials",
      })
    );
  }
  settings() {
    this.app.set("port", this.port);
    this.app.set("view engine", "hbs");
    this.app.set("views", "./src/public/views");
  }
  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static("./src/public"));
    this.app.use(
      session({
        store: mongoStore.create({
          mongoUrl: process.env.MONGO_URI,
          options: {
            userNewUrlParser: true,
            useUnifiedTopology: true,
          },
        }),
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 60000,
        },
      })
    );
  }
  socket() {
    this.io.on("connection", (socket) => {
      // User connection mid
      console.log("User connected to server 🚀🚀");
      socket.on("disconnect", () => {
        console.log("User disconnected from server 😲");
      });
      // db script
      db.createTable();
      dbLite.createTable();
      // db mid
      dbLite.readMessages().then((val) => {
        this.io.sockets.emit("toChat", val);
      });
      db.getProducts().then((val) => {
        socket.emit("list", val);
      });
      // product save on db & listed product socket emit
      socket.on("product", (p) => {
        db.setProduct(p); // save the product on mySQL db
        this.io.sockets.emit("listed", p);
      });
      // chat socket
      socket.on("message", (content) => {
        const date = new Date();
        let messageDate = `[${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`;
        content.date = messageDate;
        dbLite.saveMessage(content);
        dbLite.readMessages().then((val) => {
          this.io.sockets.emit("toChat", val);
        });
      });
    });
  }
  routes() {
    this.app.use("/", indexRouter);
    this.app.use("/api", apiRouter);
    this.app.use("/", sessionRouter);
  }
  listen() {
    this.http.listen(this.app.get("port"), () => {
      console.log("🚀 listening on port:", this.app.get("port"));
    });
    this.http.on("error", (err) => {
      console.log("server failed: ", err);
    });
  }
}
/**
 *  Export class
 */
module.exports = {
  Server: App,
};
