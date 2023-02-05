const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PayResSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  returnCode: { type: String, required: true },
  returnMessage: { type: String, required: true },
  info: {
    transactionId: { type: String, required: true },
    orderId: { type: String, required: true },
    payInfo: [
      {
        method: { type: String, required: true },
        amount: { type: Number, default: 0 },
        maskedCreditCardNumber: { type: String, required: true },
      },
    ],
    packages: [
      {
        id: { type: String, required: true },
        amount: { type: Number, default: 0 },
        userFeeAmount: { type: Number, default: 0 },
      },
    ],
    products: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, default: 0 },
        price: { type: Number, default: 0 },
        originalPrice: { type: Number, default: 0 },
      },
    ],
  },
});

PayResSchema.index({orderId:1});


const PayResModel = mongoose.model("PayRes", PayResSchema, "PayRes");

module.exports = PayResModel;
