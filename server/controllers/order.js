import Order from "../models/order.js";

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message });
};

export const AllOrders = async (_, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({ data: orders });
  } catch (error) {
    sendErrorResponse(res, 500, "Server error!");
  }
};

export const GetOneOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = Order.findById(id);
    return res.status(200).json({ data: order });
  } catch (error) {
    sendErrorResponse(res, 500, "Server error!");
  }
};

export const NewOrder = async (req, res) => {
  try {
    if (!req.body) {
      sendErrorResponse(res, 409, "Product couldnot be ordered!");
    } else {
      const newOrder = new Order(req.body);
      newOrder.save();
    }
  } catch (error) {
    sendErrorResponse(res, 500, "Server error!");
  }
};

export const CancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const canceledOrder = await Order.findByIdAndDelete(id);
    return res
      .status(201)
      .json({ data: canceledOrder, message: "Order has been canceled" });
  } catch (error) {
    sendErrorResponse(res, 500, "Server error!");
  }
};
