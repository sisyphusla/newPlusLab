const express = require("express");
const md5 = require("blueimp-md5");
const fs = require("fs");
const router = express.Router();
const CartModel = require("../models/CartModel");
const DiscountModel=require("../models/DiscountModel")



router.get("/", (req, res) => {
  CartModel.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});


router.post("/getdicount", (req, res) => { 
  (gettime = req.body), 
    DiscountModel.find(
      { user: gettime.user, EXP: { $gte: gettime.today } },
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(data);
    
        }
      }
    );
});


router.post("/cart", (req, res) => {
  courseOfCart=req.body;
 CartModel.updateOne({ user: req.body.user, id: req.body.id }, courseOfCart, {
   upsert: true,
 }).exec((err, data) => {
     if (err) {
       res.status(500).send(err);
     } else {
       res.send(courseOfCart);
     }
   });
})
router.post("/cartforyou", (req, res) => {
  courseOfCart=req.body;
 CartModel.updateOne({ user: req.body.user, id: req.body.id }, courseOfCart, {
   upsert: true,
 }).exec((err, data) => {
     if (err) {
       res.status(500).send(err);
     } else {
       res.send(courseOfCart);
     }
   });
})

router.post("/delCart", (req, res) => {
  courseOfCart = req.body;
  CartModel.deleteOne({ user: req.body.user, id: req.body.id }).exec(
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(courseOfCart);
      }
    }
  );
});

router.post("/updateCheck", (req, res) => {
  checkOfCart = req.body;
  CartModel.updateOne({ user: req.body.user, id: req.body.id }, checkOfCart, {
    upsert: true,
  }).exec((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(checkOfCart);
    }
  });
});












module.exports = router;