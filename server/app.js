const express = require("express");
const port = process.env.PORT || 3000;
const routes = require("./routes");
const errors = require(
  "./middlewares/errorHandler"
);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Selamat datang!");
});

app.use(routes);
app.use(errors);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
