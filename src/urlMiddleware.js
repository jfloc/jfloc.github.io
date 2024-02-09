// Author: Joshua Flores
// Email: joshua.flores3@snhu.edu
// Date: 02/05/2024
// Version: 0.1.0

/* The current middleware for the urls is not under use as of version 0.1.0 */

const isActivePage = (req, res, next) => {
  const currentPath = req.url;
  pages = ["/", "/packages", "/news", "/support", "/login"];
  const activePage = pages.includes(currentPath) ? currentPath : "/";
  res.locals.activePage = activePage;
  next();
};

module.exports = {
  isActivePage,
};
