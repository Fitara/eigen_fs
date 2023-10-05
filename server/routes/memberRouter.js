const memberController = require("../controllers/memberController");
const router = require("express").Router();

router.get("/members", memberController.getAllMember);
router.get("/members/:id", memberController.memberById);

module.exports = router;
