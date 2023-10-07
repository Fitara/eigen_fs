const historyController = require("../controllers/historyController");
const router = require("express").Router();

router.get("/histories", historyController.getBookHistory);

module.exports = router