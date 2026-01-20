const checkAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).send({ message: "Admin access only" });
  }
};

export { checkAdmin };
