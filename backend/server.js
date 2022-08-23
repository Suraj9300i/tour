const app = require("./app");
const mongoose = require("mongoose");

const DB_USER = "Suraj";
const DB_PASSWORD = "Y7MiJg889dgKACoq";
const DATABASE = "Places";
const db_link = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.380ifsz.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;
const port = 5000;

mongoose
  .connect(db_link)
  .then(() => {
    console.log("DB Connected");
    app.listen(port, () => {
      console.log("Listening to port ", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
