require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const exphbs = require("express-hbs");
const passport = require("passport");
const connectDB = require("./app-api/db");
require("./app-api/config/passport");

const bodyParser = require("body-parser");

const indexRouter = require("./app-api/routes/index");
const router = require("./app-server/routes/routes");
const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.engine(
  "hbs",
  exphbs.express4({
    extname: ".hbs",
    defaultLayout: "views/layouts/main",
    partialsDir: [path.join(__dirname, "views", "partials")],
  })
);
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Used to parse the data sent to the body request
app.use(bodyParser.json());

app.use(passport.initialize());

app.use("/api", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  req.header("Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();

  // Call next to pass control to the next middleware or route handler
  // next();
});

// Register indexRouter after setting up CORS headers
app.use("/api", indexRouter);

// Setting the hbs engine and ensuring paths can be found for delivering the correct templates and partial .hbs files

app.use((req, res, next) => {
  console.log("Request Headers:", req.headers);
  next();
});

// Below the routes are set up to render the correct hbs file
app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
