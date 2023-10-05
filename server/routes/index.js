const router = require("express").Router();
const memberRouter = require("./memberRouter");
const bookRouter = require("./bookRouter");

router.use(memberRouter);
router.use(bookRouter);

module.exports = router;
