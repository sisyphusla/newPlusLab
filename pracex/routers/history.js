const express = require("express");
const md5 = require("blueimp-md5");
const fs = require("fs");
const router = express.Router();
const HistoryModel = require("../models/HistoryModel");

router.post("/", (req, res) => {
  user=req.body.user
  HistoryModel.find({user:user})
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


router.post("/transData", (req, res) => {
  user = req.body.user;
  HistoryModel.find({ user: user })
    .populate("packages.products.id")
    .sort({ "packages.id": -1 })
    .exec((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
       let mycoursedata=[];
        const  myCourse =data.map((v) => {
          return v.packages[0].products.map((items)=>{
            return mycoursedata.push(items.id);
          });
        })

        res.send(mycoursedata);
      }
    });
});

router.post("/transDatas", (req, res) => {
  user = req.body.user;
  HistoryModel.find({ user: user })
    .populate("packages.products.id")
    .sort({ "packages.id": -1 })
    .exec((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        let mycoursedata = [];
        const myCourse = data.map((v) => {
          return v.packages[0].products.map((items) => {
            return mycoursedata.push(items.id);
          });
        });

        res.send(mycoursedata);
      }
    });
});

module.exports = router;
