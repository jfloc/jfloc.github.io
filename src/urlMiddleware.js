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
