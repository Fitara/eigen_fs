const bookController = require("../controllers/bookController");
const router = require("express").Router();

router.get("/books", bookController.getAllBook);
router.post("/books/:bookId/borrow/:memberId", bookController.borrowBook);
router.post("/books/:bookId/return/:memberId", bookController.returnBook);

module.exports = router;
