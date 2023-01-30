const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema(
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
    shoppingPrice: { type: Number, required: true },
    isChecked: { type: Boolean, default: false },
    isSuccessed: { type: Boolean, default: false },
    discountCode: { type: String, default: "" },
    discount: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

const HistoryModel = mongoose.model("History", HistorySchema, "History");

module.exports = HistoryModel;
