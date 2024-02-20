const { Router } = require("express");
const CardService = require("../services/card");

const genericRouter = require("./generic");
const genericController = require("../controllers/generic");

const router = new Router();

router.use("/", new genericRouter(new genericController(new CardService())));

module.exports = router;
