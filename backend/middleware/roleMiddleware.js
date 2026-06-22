const adminOnly = (req, res, next) => {

  if (req.user.role === "admin") {

    next();

  } else {

    res.status(403).json({
      message: "Admin access only",
    });

  }

};

const vendorOnly = (req, res, next) => {

  if (req.user.role === "vendor") {

    next();

  } else {

    res.status(403).json({
      message: "Vendor access only",
    });

  }

};

const deliveryOnly = (req, res, next) => {

  if (req.user.role === "delivery") {

    next();

  } else {

    res.status(403).json({
      message: "Delivery access only",
    });

  }

};

module.exports = {
  adminOnly,
  vendorOnly,
  deliveryOnly,
};