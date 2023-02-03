const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharterSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: Array,
    required: true
  },
  video: {
    type: mongoose.Schema.Types.Mixed,
  }
});

const CourseListSchema = new Schema({
  courseList: [CharterSchema]
});

module.exports = mongoose.model('CourseList', CourseListSchema, 'courseList');