const express = require("express");
const md5 = require("blueimp-md5");
const fs = require("fs");
const router = express.Router();
const CollectionsModel = require("../models/CollectionsModel");


router.get("/", (req, res) => {
 CollectionsModel.find({}, (err, data) => {
   if (err) {
     res.status(500).send(err);
   } else {
     res.send(data);
   }
 });
});

router.post("/updateCollections", (req, res) => {
  courseOfCollections = req.body;
  CollectionsModel.updateOne(
    { user: req.body.user, id: req.body.id },
    courseOfCollections,
    {
      upsert: true,
    }
  ).exec((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(courseOfCollections);
    }
  });
});

router.post("/delcollection", (req, res) => {
  courseOfCollections = req.body;
  CollectionsModel.deleteOne({ user: req.body.user, id: req.body.id }).exec(
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(courseOfCollections);
      }
    }
  );
});

module.exports = router;