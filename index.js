const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./routes/index.js");

const app = express();
const PORT = process.env.APP_PORT || 5000;
// const urlApp = "http://localhost:5174";

// app.use(cors({ credentials: true, origin: `${urlApp}` }));
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
