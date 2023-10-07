const errors = async function (err, req, res, next) {
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    res.status(400).json({ validationError: err.errors[0].message });
  } else if (err.name === "MemberPenalized") {
    res.status(403).json({ message: "Member cannot borrow within 3 days" });
  } else if (err.name === "NoHistories") {
    res.status(403).json({ message: "There is no book history yet" });
  } else if (err.name === "BookUnavailable") {
    res.status(404).json({ message: "Book Unavailable" });
  } else if (err.name === "MemberNotFound") {
    res.status(404).json({ message: "Member not found" });
  } else if (err.name === "BookedIsEmpty") {
    res.status(404).json({ message: "Member has not borrowed any books" });
  } else if (err.name === "BookedLimited") {
    res.status(409).json({ message: "Member has already borrowed 2 books" });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = errors;
