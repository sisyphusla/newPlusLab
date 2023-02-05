const express = require('express')
const CourseAdd = require('../schema/courseaddschema.js');
const router = express.Router()



router.post('/courseadd', (req, res) => {
  const courseList = new CourseAdd({
    courseList: req.body.courseList,
  });
  courseList.save()
    .then(() => {
      console.log(req.body.courseList);
      res.send('收到課程列表');
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/courseadd', (req, res) => {
  CourseAdd.find({}, (err, courseList) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(courseList);
    }
  });
});



module.exports = router;