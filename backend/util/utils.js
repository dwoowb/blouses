const moment = require('moment-timezone');
const { client, twilioNumber } = require('../twilio_config');
const { validStatuses, replyText } = require('./constants');
const { handleError } = require('./error_handler');
const { Game } = require('../models/game');
const { User } = require('../models/user');

// TODO: breakout kickOffSMS, sendWeeklySMS, and gameReminder into a ScheduledTexts module?

const kickOffSMS = (sendSMS) => {
  Game.nextGame((err, nextGame) => {
    if (err) return handleError(err);
    // console.log('*****Current Game*****\r\n', nextGame);

    if (nextGame) {
      // PROD
      // if initialDelay is negative we're already past the Sunday of the nextGame
      const initialDelay = moment.tz(nextGame.date, process.env.MOMENT_LOCALE).weekday(0).startOf('day').hour(10).diff(moment()) || 0;
      const weeklyDelay = 6.048e+8;
      // DEV
      // const initialDelay = 5000;
      // const weeklyDelay = 5000;
      // PROD

      const startInterval = setInterval(() => {
          sendSMS();
      }, weeklyDelay);
      setTimeout(() => { sendSMS(); startInterval; }, initialDelay);
    } else {
      console.log(replyText.NO_CONTEST);
    };
  });
};

const sendWeeklySMS = () => {
  Game.nextGame((err, game) => {
    const gameTime = formatGame(game);

    let SMSBody;
    const gameText = game.bye
      ? replyText.BYE.toLowerCase()
      : `this week's game is on ${gameTime} reply 'In', 'Out', or 'Maybe'. Text 'Roster' to see who's playing.`;

    User.find({}, (err, members) => {
      if (err) return handleError(err);

      members.forEach(({ _id, name, phone, active, sentWeeklySMS }) => {
        if (active && !sentWeeklySMS[game.id]) {
          SMSBody = `Hey ${name}, ${gameText} ${replyText.SIG}`;
          client.messages.create({
            body: SMSBody,
            to: phone,
            from: twilioNumber,
          }).then(response => {
            console.log(response);
            sentWeeklySMS[game.id] = true;
            User.update(
              { _id },
              { $set: { sentWeeklySMS } },
              handleError
            );
          });
        }
      });
    });
  });
};

const formatGame = (game) => {
  return moment(game.date).format('M/D, h:mma');
};

const gameReminder = () => {
  // TODO: every Tuesday remind the team of the game time and who's in so far
  // TODO: if we're at 5 ask the maybe's to confirm in or out
  // TODO: if we're under 5 tell the maybe's and the out's we need more people
  // TODO: append text with replyText.SIG, maybe for all non reply sms we should append the sig
};

const isValidStatus = status => validStatuses.includes(status);

module.exports = { kickOffSMS, sendWeeklySMS, isValidStatus, formatGame };
