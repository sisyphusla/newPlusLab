const express = require("express");
const md5 = require("blueimp-md5");
const fs = require("fs");
const cors = require("cors");
const router = express.Router();
const OrderModel = require("../models/OrderModel");
const DiscountModel = require("../models/DiscountModel");
const axios = require("axios");
const { json } = require("express");
const { HmacSHA256 } = require("crypto-js");
const Base64 = require("crypto-js/enc-base64");

require("dotenv").config();

const {
  LINEPAY_CHANNEL_ID,
  LINEPAY_CHANNEL_SECRET_KEY,
  LINEPAY_VERSION,
  LINEPAY_SITE,
  LINEPAY_RETURN_HOST,
  LINEPAY_RETURN_CONFIRM_URL,
  LINEPAY_RETURN_CANCEL_URL,
} = process.env;

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
  let courseOfOrder = req.body;
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
  let discountData = req.body;
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
  let deleteOrder = req.body;
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

router.post("/topay", async (req, res) => {
  try {
    const linepayBody = {
      amount: req.body.amount,
      currency: req.body.currency,
      orderId: req.body.orderid,
      packages: req.body.packages,
      redirectUrls: {
        confirmUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CONFIRM_URL}`,
        cancelUrl: `${LINEPAY_RETURN_HOST}${LINEPAY_RETURN_CANCEL_URL}`,
      },
    };

    const uri = `/payments/request`;
    const nonce = parseInt(new Date().getTime() / 1000);

    const string = `${LINEPAY_CHANNEL_SECRET_KEY}/${LINEPAY_VERSION}${uri}${JSON.stringify(
      linepayBody
    )}${nonce}`;

    const signature = Base64.stringify(
      HmacSHA256(string, LINEPAY_CHANNEL_SECRET_KEY)
    );
    const headers = {
      "X-LINE-ChannelId": LINEPAY_CHANNEL_ID,
      "Content-Type": "application/json",
      "X-LINE-Authorization-Nonce": nonce,
      "X-LINE-Authorization": signature,
    };

    const url = `${LINEPAY_SITE}/${LINEPAY_VERSION}${uri}`;

    const linePayRes = await axios.post(url, linepayBody, { headers });

    if (linePayRes?.data?.returnCode === "0000") {
      res.send(linePayRes?.data?.info.paymentUrl.web);
    }
    res.end;
  } catch (error) {
    console.log(error);
    res.end;
  }
});

module.exports = router;
