// Author: Joshua Flores
// Purpose: Serve the front-end page client side with axios and api call

const axios = require("axios");

async function fetchData() {
  try {
    const baseUrl = "http://localhost:3000/api";
    const countryUrl = `${baseUrl}/country`;
    const response = await axios.get(countryUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

const renderPage = async (req, res) => {
  try {
    // Call the fetchData function from your controller
    const countries = await fetchData();

    // Render the template based on the route path and pass the fetched data
    res.render(req.path.slice(1), { countries, isNewsPage: true });
  } catch (error) {
    console.error("Error rendering page:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { renderPage };
