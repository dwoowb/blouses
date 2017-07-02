const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../models/user');
const { fail } = require('../util/error_handler');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  User.find({}, function(err, users) {
    if (err) fail(res, err, 'Error on getting all users!', 400);
    res.send(users);
  });
});

router.post('/', (req, res) => {
  User.insertMany(req.body, (err, members) => {
    if (err) fail(res, err, 'Error on creating team!', 400);
    res.send(members);
  });
});

router.delete('/', (req, res) => {
  User.remove({}, (err, users) => {
    if (err) fail(res, err, 'Error on destroy!', 400);
    res.send('Entire team was deleted');
  });
});

module.exports = router;