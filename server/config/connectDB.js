const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    let result = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("data base connected");
  } catch (error) {
    console.log(`plz connect to database ${error}`);
  }
};
module.exports = connectDB;
