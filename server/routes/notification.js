const { Router } = require("express");
const NotificationService = require("../services/notification");

const genericRouter = require("./generic");
const genericController = require("../controllers/generic");

const router = new Router();

router.use("/", new genericRouter(new genericController(new NotificationService())));

module.exports = router;
