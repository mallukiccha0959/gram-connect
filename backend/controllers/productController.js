const Product = require("../models/Product");


// ADD PRODUCT
const addProduct = async (req, res) => {

  try {

    const {
      name,
      description,
      price,
      category,
      stock,
      image,
    } = req.body;

    const product = await Product.create({

      name,
      description,
      price,
      category,
      stock,
      image,

      vendor: req.user.id,

    });

    // TEMPORARY DEBUG
    console.log(product);

    res.status(201).json(product);

  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET ALL PRODUCTS
const getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET VENDOR PRODUCTS
const getVendorProducts = async (req, res) => {

  try {

    const products = await Product.find({
      vendor: req.user.id,
    });

    res.json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    res.json(product);

  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }

    // OWNER CHECK
    if (
      product.vendor.toString() !==
      req.user.id
    ) {

      return res.status(401).json({
        message: "Not authorized",
      });

    }

    product.name =
      req.body.name || product.name;

    product.price =
      req.body.price || product.price;

    product.stock =
      req.body.stock || product.stock;

    product.category =
      req.body.category || product.category;

    product.image =
      req.body.image || product.image;

    await product.save();

    res.json(product);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({
        message: "Product not found",
      });

    }

    // CHECK PRODUCT OWNER
    if (
      product.vendor.toString() !==
      req.user.id
    ) {

      return res.status(401).json({
        message: "Not authorized",
      });

    }

    await product.deleteOne();

    res.json({
      message: "Product deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {

  addProduct,
  getProducts,
  getVendorProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,

};