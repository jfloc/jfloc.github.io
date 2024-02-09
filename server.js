const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./app-api/db");
const countriesRouter = require("./app-api/routes/countries");
const exphbs = require("express-hbs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

connectDB();
// Used to parse the data sent to the body request
app.use(bodyParser.json());

app.use("/api/countries", countriesRouter);
// Setting the hbs engine and ensuring paths can be found for delivering the correct templates and partial .hbs files
app.engine(
  "hbs",
  exphbs.express4({
    extname: ".hbs",
    defaultLayout: "views/layouts/main",
    partialsDir: [path.join(__dirname, "views", "partials")],
  })
);
app.set("view engine", "hbs");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Below the routes are set up to render the correct hbs file
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/packages", (req, res) => {
  res.render("packages");
});

app.get("/news", (req, res) => {
  //Sent extra property of isNewsPage to ensure newspage.css file is loaded for this page
  res.render("news", { isNewsPage: true });
});

app.get("/support", (req, res) => {
  res.render("support");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
