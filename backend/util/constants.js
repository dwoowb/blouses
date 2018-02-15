const responseMapping = {
  IN: 'Great, see you there! Please do NOT drink before the game.',
  OUT: 'That\'s too bad, bye bye playing time!',
  MAYBE: 'Okay, well it\'s never too late to change your mind and reply \'In\'',
  COMMANDS: 'Try one of these keywords: \'In\', \'Out\', \'Maybe\', \'Roster\'',
  DEFAULT: 'Sorry I didn\'t understand that, reply with \'Commands\' for more information.',
};

const replyText = {
  BYE: 'We have a bye this week',
  SIG: '-Blouses Bot',
  DROIDS: 'This is not the number you\'re looking for...',
  NO_CONTEST: 'Couldn\'t find the next game, are you sure the season is underway?',
  INACTIVE: 'I don\'t see you on the roster for this season...'
};

const validStatuses = ['IN', 'OUT', 'MAYBE'];
// one week in milliseconds
const oneWeek = 6.048e+8;
// Tuesday
const remindDay = 2;
// Sunday
const announceDay = 0;

const scheduledTime = 10;

module.exports = { responseMapping, replyText, validStatuses, oneWeek, remindDay, announceDay, scheduledTime };
