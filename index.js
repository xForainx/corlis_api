const express = require("express");
const app = express();
const port = 3000;
const userRouter = require("./routes/user");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "le serveur tourne" });
});
//app.use("/corlis_bd", userRouter);
app.use("/", userRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log(`Base utilisée : ${process.env.MARIADB_DB}`);
});