const { Member, BookHistory } = require("../models/index");

class Controller {
  static async getAllMember(req, res, next) {
    try {
      const members = await Member.findAll({
        include: { model: BookHistory },
      });

      res.status(200).json(members);
    } catch (err) {
      next(err);
    }
  }

  static async memberById(req, res, next) {
    try {
      const member = await Member.findByPk(req.params.id, {
        include: {
          model: BookHistory,
        },
      });

      if (!member) throw { name: "MemberNotFound" };

      const booked = member.BookHistories.length;

      if (booked === 0) throw { name: "BookedIsEmpty" };

      res.status(200).json({
        member: {
          id: member.id,
          code: member.code,
          name: member.name,
          booked,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
