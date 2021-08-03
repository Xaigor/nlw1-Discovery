const express = require("express");
const server = express();
// Configurando pasta public
server.use(express.static("public"));

// Utilizando template Engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
server.get("/create-point", (req, res) => {
  res.sendFile(__dirname + "/views/create-point.html");
});

server.listen(3000);
console.log("Servidor rodando");
