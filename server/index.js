const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes");
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const { secret } = require("./config/auth.config");
const { notFound, errorHandler } = require("./middlewares/errorMiddlware");
const app = express();

var corsOptions = {
  origin: process.env.FRONTEND_URL,
  method: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "../../public")));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//get request
app.get("/", (req, res) => {
  res.send("welcome to UF.");
});

//routes
app.use(router);

//not found
app.use(notFound);
//internal server error
app.use(errorHandler);

//port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
