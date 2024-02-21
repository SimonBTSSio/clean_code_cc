const { Router } = require("express");
const CardController = require("../controllers/card");
const CardService = require("../services/card");

const genericRouter = require("./generic");
const genericController = require("../controllers/generic");
const Controller = new CardController(new CardService());

const router = new Router();

router.use("/", new genericRouter(new genericController(new CardService())));

router.get("/quizz", Controller.quizz);
router.patch('/:cardId/answer', Controller.answerCard);

module.exports = router;
