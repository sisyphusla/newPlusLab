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
      res.send('收到訊息');
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

// router.put('/courseadd/:id', (req, res) => {
//   CourseAdd.findByIdAndUpdate(req.params.id, req.body.courseList, { new: true }, (err, updatedCourseList) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.json(updatedCourseList);
//     }
//   });
// });

module.exports = router;