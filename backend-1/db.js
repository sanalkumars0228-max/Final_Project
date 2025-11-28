const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("mongodb://localhost:27017/hospital")
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log(err));
};
