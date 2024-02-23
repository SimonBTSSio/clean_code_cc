const { Router } = require("express");
const CardTagService = require("../services/cardTag");

const genericRouter = require("./generic");
const genericController = require("../controllers/generic");

const router = new Router();

router.use("/", new genericRouter(new genericController(new CardTagService())));

module.exports = router;
