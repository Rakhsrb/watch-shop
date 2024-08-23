import Product from "../models/product.js";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export const CreateNewProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    return res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};

export const GetAllProducts = async (_, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res.status(404).json({
        message: "Product not found.",
      });
    }
    return res.status(201).json({ data: products });
  } catch (error) {
    return sendErrorResponse(res, 500, "Internal server error.");
  }
};
