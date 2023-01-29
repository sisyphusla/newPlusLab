const express = require("express");
const md5 = require("blueimp-md5");
const fs = require("fs");
const router = express.Router();
const OrderModel = require("../models/OrderModel");
const DiscountModel = require("../models/DiscountModel");

router.post("/get", (req, res) => {
  OrderModel.find({ user: req.body.user }, (err, data) => {
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

router.post("/updatediscount", (req, res) => {
  discountData = req.body;
  DiscountModel.find(
    { user: discountData.user, discountCode: discountData.discount },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (discountData.length !== 0) {
          OrderModel.updateMany(
            { user: discountData.user },
            {
              $set: {
                discount: data[0].discount,
                discountCode: data[0].discountCode,
              },
            }
          ).exec((err, data) => {
            if (err) {
              res.status(500).send(err);
            } else {
              OrderModel.find({ user: discountData.user }, (err, data) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  res.send(data);
                }
              });
            }
          });
        }
      }
    }
  );
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
