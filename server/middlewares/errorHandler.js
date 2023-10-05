const errors = async function (err, req, res, next) {
  const errorMessages = {};

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    errorMessages.validationError = err.errors[0].message;
    res.status(400);
  }

  if (err.name === "StockEmpty") {
    errorMessages.stockEmpty = "No available books";
    res.status(404);
  }

  if (err.name === "MemberNotFound") {
    errorMessages.memberNotFound = "Member not found";
    res.status(404);
  }

  if (err.name === "BookedIsEmpty") {
    errorMessages.bookedIsEmpty = "Member has not borrowed any books";
    res.status(404);
  }

  if (err.name === "MemberPenalized") {
    errorMessages.memberPenalized = "Member cannot borrow within 3 days";
  }

  if (err.name === "BookedLimited") {
    errorMessages.bookedLimited = "Member has already borrowed 2 books";
  }

  if (Object.keys(errorMessages).length > 0) {
    res.json(errorMessages);
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = errors;
