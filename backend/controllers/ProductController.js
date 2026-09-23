const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  res.json(product);
};

exports.addNewProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
};

exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const editedProduct = await Product.findOneAndUpdate({ _id: id }, req.body,{new:true})
  res.json(editedProduct)
};
