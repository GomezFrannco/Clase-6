/**
 *  Server modules
 */
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");
const { Data } = require("./src/controller/data.js");

class App {
  constructor() {
    this.app = express();
    this.http = createServer(this.app);
    this.io = new Server(this.http);
    this.viewEngine();
    this.settings();
    this.middlewares();
    this.socket();
    this.appRoutes();
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
    this.app.set("port", 8080);
    this.app.set("view engine", "hbs");
    this.app.set("views", "./src/public/views");
  }
  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static("./src/public"));
  }
  socket() {
    const fs = new Data();
    const list = fs.read();
    const messagesHistory = [];
  // console.log(`[${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`)
    this.io.on("connection", (socket) => {
      console.log("User connected to server 😲");
      socket.emit("list", list);
      this.io.sockets.emit('toChat', messagesHistory)
      socket.on("disconnect", () => {
        console.log("User disconnected from server 😲");
      });

      // list socket
      socket.on("product", (p) => {
        list.push(p);
        fs.save(p);
        this.io.sockets.emit("listed", p);
      });

      // chat socket
      socket.on('message', (content)=> {
        const date = new Date();
        let messageDate = `[${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`
        content.date = messageDate;
        messagesHistory.push(content)
        this.io.sockets.emit('toChat', messagesHistory)
      });
    });
  }
  appRoutes() {
    const fs = new Data();
    this.app.get("/", (req, res) => {
      try {
        res.status(200).render("main");
      } catch (e) {
        res.status(200).render("emptyList");
      }
    });
    this.app.get("/products", (req, res) => {
      const data = fs.read();
      res.json(data);
    });
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
