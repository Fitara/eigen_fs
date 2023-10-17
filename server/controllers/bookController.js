const { Book, Member, BookHistory } = require("../models/index");

class Controller {
  static async getAllBook(req, res, next) {
    try {
      const books = await Book.findAll();

      res.status(200).json(books);
    } catch (err) {
      next(err);
    }
  }

  static async borrowBook(req, res, next) {
    try {
      const { bookId, memberId } = req.params;

      const book = await Book.findByPk(bookId);

      if (book.stock <= 0) throw { name: "BookUnavailable" };

      const member = await Member.findByPk(memberId, {
        include: {
          model: BookHistory,
        },
      });

      if (!member) throw { name: "MemberNotFound" };

      const currentDate = new Date();
      if (member.isPenalized) {
        const lastBookReturn = await BookHistory.findOne({
          where: {
            memberId: memberId,
            status: "returned",
          },
          order: [["updatedAt", "DESC"]],
        });

        if (lastBookReturn) {
          const msPerDay = 24 * 60 * 60 * 1000;
          const daysSincePenalty = Math.floor(
            (currentDate - lastBookReturn.updatedAt) / msPerDay
          );

          if (daysSincePenalty < 3) {
            throw { name: "MemberPenalized" };
          }
        }
      }

      const bookedCount = await BookHistory.count({
        where: {
          memberId: memberId,
          status: "borrowed",
        },
      });

      if (bookedCount >= 2) throw { name: "BookedLimited" };

      book.stock -= 1;
      await book.save();

      await BookHistory.create({
        memberId,
        bookId,
        status: "borrowed",
      });

      res.status(200).json({ message: "Book successfully borrowed" });
    } catch (err) {
      next(err);
    }
  }

  static async returnBook(req, res, next) {
    try {
      const { memberId, bookId } = req.params;

      const member = await Member.findByPk(memberId);

      if (!member) throw { name: "MemberNotFound" };

      const book = await Book.findByPk(bookId);

      if (!book) throw { name: "BookNotFound" };

      const bookHistory = await BookHistory.findOne({
        where: {
          memberId: memberId,
          bookId: bookId,
          status: "borrowed",
        },
      });

      if (!bookHistory) throw { name: "BookNotBorrowed" };

      const returnDate = new Date();
      const msPerDay = 24 * 60 * 60 * 1000;
      const borrowedDate = new Date(bookHistory.createdAt);
      const daysDiff = Math.floor((returnDate - borrowedDate) / msPerDay);

      if (daysDiff > 7) {
        member.isPenalized = true;
        await member.save();
      }

      book.stock += 1;
      await book.save();

      bookHistory.status = "returned";
      bookHistory.updatedAt = returnDate;
      await bookHistory.save();

      res.status(200).json({ message: "Book successfully returned" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
