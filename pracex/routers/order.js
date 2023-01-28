const express = require("express");
const md5 = require("blueimp-md5");
const fs = require("fs");
const router = express.Router();
const OrderModel = require("../models/OrderModel");



router.get("/", (req, res) => {
  OrderModel.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/update", (req, res) => {
  courseOfOrder = req.body;
  OrderModel.updateOne(
    { user: req.body.user, id: req.body.id },
    courseOfOrder,
    {
      upsert: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(courseOfOrder);
    }
  });
});

router.post("/delete", (req, res) => {
  deleteOrder = req.body;
  OrderModel.deleteOne({ user: req.body.user, id: req.body.id }).exec(
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(deleteOrder);
      }
    }
  );
});
module.exports = router;