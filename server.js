const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
// 1 test
app.use("/api/v1/test", require("./routes/testRoutes"));
// 2 auth
app.use("/api/v1/auth", require("./routes/authRoutes"));

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue
      .white,
  );
});
