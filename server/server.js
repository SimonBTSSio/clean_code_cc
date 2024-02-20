require("dotenv").config();
const express = require("express");
const http = require('http');
const SecurityRouter = require("./routes/security");
const UserRouter = require("./routes/user");
const CardRouter = require("./routes/card");
const CardTagRouter = require("./routes/cardTag");
const NotificationRouter = require("./routes/notification");
const QuizRouter = require("./routes/quiz");
const TagRouter = require("./routes/tag");
const cors = require("cors");
const port = 3000;


const app = express();

app.use(cors());
app.use(express.json());

app.use("/", SecurityRouter);
app.use("/users", UserRouter);
app.use("/cards", CardRouter);
app.use("/cardTags", CardTagRouter);
app.use("/notifications", NotificationRouter);
app.use("/quizs", QuizRouter);
app.use("/tags", TagRouter);
app.get("/", (req, res) => {
  res.send("Hello world !");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server running on port " + port);
});

module.exports = server;
