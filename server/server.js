const express = require("express");
require("dotenv").config();
const app = express();
const dbConnect = require("./config/connectDB");

// connect DB
dbConnect();
//create routes
//middleware routing
app.use(express.json());
app.use("/api/contact", require("./routes/contacts"));
const PORT = process.env.PORT;

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log("server is running")
);
