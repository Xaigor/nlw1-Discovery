const express = require("express");
const server = express();
// Configurando pasta public
server.use(express.static("public"));

// Utilizando template Engine
const nunjucks = require("nunjucks");
// Informando em qual pasta estão os HTML's
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.get("/", (req, res) => {
  return res.render(__dirname + "index.html");
});
server.get("/create-point", (req, res) => {
  return res.render(__dirname + "create-point.html");
});
server.get("/search", (req, res) => {
  return res.render(__dirname + "search-results.html");
});

server.listen(3000);
console.log("Servidor rodando");
