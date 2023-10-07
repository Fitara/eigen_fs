const { BookHistory, Book, Member } = require("../models/index");

class Controller {
  static async getBookHistory(req, res, next) {
    try {
      const histories = await BookHistory.findAll({
        order: [["id", "DESC"]],
        include: [Book, Member]
      });

      if (histories.length === 0) throw { name: "NoHistories"}

      res.status(200).json(histories);
    } catch (err) {
      console.log(err, "<<<<<");
      next(err);
    }
  }
}

module.exports = Controller;
