const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    id: { type: Number, default: 0 },
    Course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    img: { type: String, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    teacher: { type: String, required: true },
    price: { type: Number, default: 0 },
    special: { type: Number, default: 0 },
    shoppingPrice: { type: Number, required: true },
    isChecked:{type: Boolean, default: false}
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("Order", OrderSchema, "Order");

module.exports = OrderModel;
