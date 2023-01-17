const express = require('express')
const Comment = require('../schema/videocommentschema.js');
const router = express.Router()



router.post('/comment', (req, res) => {
  const comment = new Comment({
    currentValue: req.body.currentValue,
    comment: req.body.comment
  });
  comment.save()
    .then(() => {
      console.log(req.body.currentValue);
      console.log(req.body.comment);
      res.send('收到訊息');
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/comment', (req, res) => {
  Comment.find({}, (err, videocomment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(videocomment);
    }
  });
});

router.delete('/comment/:id', (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send('刪除成功');
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;