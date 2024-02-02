const express = require("express");
const path = require("path");
const scraper = require("./src/scraper");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "src", "public")));
const urlToScrape = "https://www.cnn.com/travel/destinations";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "public", "index.html"));
});

scraper
  .scrapeData(urlToScrape)
  .then((headings) => {
    console.log("Scraped Headings:", headings);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
