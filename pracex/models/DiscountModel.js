const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiscountSchema = new Schema(
  {
    id: { type: Number, default: 0 },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    EXP: { type: Date, required: true, default: new Date() },
    discountName: { type: String, required: true },
    discountCode: { type: String, required: true },
    discount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const DiscountModel = mongoose.model("Discount", DiscountSchema, "Discount");

module.exports = DiscountModel;
