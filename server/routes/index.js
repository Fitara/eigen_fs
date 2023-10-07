const router = require("express").Router();
const memberRouter = require("./memberRouter");
const bookRouter = require("./bookRouter");
const historyRouter = require("./historyRouter");

router.use(memberRouter);
router.use(bookRouter);
router.use(historyRouter);

module.exports = router;
