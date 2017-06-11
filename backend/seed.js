const members = [
  {
    name: 'DEV',
    phoneNumber: process.env.DEV_NUMBER,
  }
];

// TODO: game data should be scraped/pulled from the excel spreadsheet
const games = [
  {
    date: '6/7',
    time: '8pm',
  },
  {
    date: '6/14',
    time: '6pm',
  },
  {
    bye: true
  }
]

module.exports = { members, games };
