const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharterSchema = new Schema({
  // _id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // },
  classname: {
    type: String,
    required: false
  },

  title: {
    type: String,
    required: false
  },
  content: {
    type: Array,
    required: false
  },
});



const CourseListSchema = new Schema({
  courseList: [CharterSchema]
});

module.exports = mongoose.model('CourseList', CourseListSchema, 'courseList');