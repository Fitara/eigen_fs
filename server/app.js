const express = require("express");
const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Selamat datang!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
