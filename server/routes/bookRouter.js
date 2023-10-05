const bookController = require("../controllers/bookController");
const router = require("express").Router();

router.get("/books", bookController.getAllBook);
router.get("/books/borrow/:bookId/:memberId", bookController.borrowBook)
router.get("/books/return/:bookId/:memberId", bookController.returnBook);

module.exports = router;
