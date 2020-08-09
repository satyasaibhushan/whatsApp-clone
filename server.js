const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config()
//DB Connection
mongoose.connect(
  process.env.DB_LINK,
  { useNewUrlParser: true, useUnifiedTopology: true  },
  () => {
    console.log("connected to DB");
  }
);
//middleWares
app.use(express.json())

//import routes
const authRoute = require("./routes/auth");

//route middleWares
app.use("/api/user", authRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
