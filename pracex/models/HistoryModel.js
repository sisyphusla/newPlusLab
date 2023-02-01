const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    orderId: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
    packages: [
      {
        id: { type: String, default: "" },
        name: { type: String, default: "" },
        amount: { type: Number, default: 0 },
        products: [
          {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Course",
              required: true,
            },
            name: { type: String, default: "" },
            quantity: { type: Number, default: 0 },
            price: { type: Number, default: 0 },
            imageUrl: { type: String, default: "" },
            originalPrice: { type: Number, default: 0 },
          },
        ],
      },
    ],
    redirectUrls: {
      confirmUrl: { type: String, default: "" },
      cancelUrl: { type: String, default: "" },
    },
    name: { type: String, default: "" },
    isSuccessed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const HistoryModel = mongoose.model("History", HistorySchema, "History");

module.exports = HistoryModel;
