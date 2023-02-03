const express = require('express')
const CrouseAdd = require('../schema/crouseaddschema.js');
const router = express.Router()



router.post('/crouseadd', (req, res) => {
  const crouseList = new CrouseAdd({
    crouseList: req.body.crouseList,
  });
  crouseList.save()
    .then(() => {
      console.log(req.body.crouseList);
      res.send('收到訊息');
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/crouseadd', (req, res) => {
  CrouseAdd.find({}, (err, crouseList) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(crouseList);
    }
  });
});

// router.put('/crouseadd/:id', (req, res) => {
//   CrouseAdd.findByIdAndUpdate(req.params.id, req.body.crouseList, { new: true }, (err, updatedCrouseList) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.json(updatedCrouseList);
//     }
//   });
// });

module.exports = router;