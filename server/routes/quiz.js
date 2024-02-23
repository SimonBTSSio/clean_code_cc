const { Router } = require("express");
const QuizService = require("../services/quiz");

const genericRouter = require("./generic");
const genericController = require("../controllers/generic");

const router = new Router();

router.use("/", new genericRouter(new genericController(new QuizService())));

module.exports = router;
