const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeData(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const headings = [];
    $(
      ".container__link--type-article > div > div > .container__headline-text"
    ).each((index, element) => {
      const headline = $(element).text().trim();
      const link = $(element).closest("a").attr("href"); // Get the href attribute of the parent <a> element

      // Push an object containing both headline and link
      headings.push({ headline, link });
    });

    return headings;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  scrapeData,
};
