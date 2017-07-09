const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const { Game } = require('../models/game');
const { fail } = require('../util/error_handler');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  Game.find({}, (err, games) => {
    if (err) fail(res, err, 'Error on getting all games!', 400);
    res.send(games);
  });
});

router.post('/', (req, res) => {
  const season = req.body.map(({ date, time }) => {
    return { date: moment.tz(`${date} ${time}`, 'M/D H:m', process.env.MOMENT_LOCALE).toISOString() }
  });

  Game.insertMany(season, (err, games) => {
    if (err) fail(res, err, 'Error on creating season!', 400);
    res.send(games);
  });
});

router.delete('/', (req, res) => {
  Game.remove({}, (err) => {
    if (err) fail(res, err, 'Error on destroy!', 400);
    res.send('Entire season was deleted');
  });
});

module.exports = router;
