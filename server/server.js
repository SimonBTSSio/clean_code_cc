require("dotenv").config();
const express = require("express");
const http = require('http');
const SecurityRouter = require("./routes/security");
const UserRouter = require("./routes/user");
const cors = require("cors");
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", SecurityRouter);
app.use("/users", UserRouter);
app.get("/", (req, res) => {
  res.send("Hello world !");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server running on port " + port);
});

module.exports = server;
