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

const CrouseListSchema = new Schema({
  crouseList: [CharterSchema]
});

module.exports = mongoose.model('CrouseList', CrouseListSchema, 'crouseList');