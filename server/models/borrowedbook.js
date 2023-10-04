"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BorrowedBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BorrowedBook.belongsTo(models.Member, { foreignKey: "memberId" });
      BorrowedBook.belongsTo(models.Book, { foreignKey: "bookId" });
    }
  }
  BorrowedBook.init(
    {
      memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Member ID is required" },
          notNull: { msg: "Member ID is required" },
        },
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Book ID is required" },
          notNull: { msg: "Book ID is required" },
        },
      },
      returnDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: { msg: "Return date must be valid" },
        },
      },
    },
    {
      sequelize,
      modelName: "BorrowedBook",
    }
  );
  return BorrowedBook;
};
