const express = require("express");
const md5 = require("blueimp-md5");
const fs = require("fs");
const router = express.Router();
const HistoryModel = require("../models/HistoryModel");

router.get("/", (req, res) => {
  HistoryModel.find({})
    .populate("packages.products.id")
    .sort({ "packages.id": -1 })
    .exec((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(data);
      }
    });
});

module.exports = router;
