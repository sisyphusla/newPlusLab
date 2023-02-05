const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    Course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    id: { type: Number, default: 0 },
    img: { type: String, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    star: { type: Number, default: 0, min: 0, max: 5, required: true },
    ratecount: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    special: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    videLength: { type: Number, default: 0 },
    teacher: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CollectionsModel = mongoose.model(
  "Collections",
  CollectionSchema,
  "Collections"
);

module.exports = CollectionsModel;
