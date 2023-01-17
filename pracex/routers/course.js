const express = require("express");
const md5 = require("blueimp-md5");
const fs = require("fs");
const router = express.Router();
const CourseModel = require("../models/CourseModel");


router.get("/popCourses", (req, res) => {
  CourseModel.find({ star: 4 }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});
router.get("/recentClass", (req, res) => {
  CourseModel.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

router.get("/forYouCourse", (req, res) => {
  CourseModel.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

router.get("/allCourses", (req, res) => {
  CourseModel.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(data);
    }
  });
});

router.get("/Couponbar", (req, res) => {
  fs.readFile("./models/CouponData.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let result = JSON.parse(data);
      res.send(result);
    }
  });
});

module.exports = router;
