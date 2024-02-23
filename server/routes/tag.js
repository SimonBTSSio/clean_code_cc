const { Router } = require("express");
const TagService = require("../services/tag");

const genericRouter = require("./generic");
const genericController = require("../controllers/generic");

const router = new Router();

router.use("/", new genericRouter(new genericController(new TagService())));

module.exports = router;
