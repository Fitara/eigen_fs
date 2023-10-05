"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookTraffic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookTraffic.belongsTo(models.Member, { foreignKey: "memberId" });
      BookTraffic.belongsTo(models.Book, { foreignKey: "bookId" });
    }
  }
  BookTraffic.init(
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
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["borrowed", "returned"]],
            msg: "Status must be 'borrowed' or 'returned'",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "BookTraffic",
    }
  );
  return BookTraffic;
};
