const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VideoNoteSchema = new Schema({
  note: {
    type: String,
  },
  b: {
    type: String,
  }
});

module.exports = mongoose.model('Video', VideoNoteSchema, 'videonote');