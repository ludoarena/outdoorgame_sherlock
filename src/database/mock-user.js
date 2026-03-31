const bcrypt = require("bcrypt");

const USERS = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Merveille",
    email: "alice.merveille@gmail.com",
    password: bcrypt.hashSync("alice", 10),
    isAdmin: false,
  },
  {
    id: 2,
    firstName: "Bernard",
    lastName: "Nanard",
    email: "bernard.nanard@gmail.com",
    password: bcrypt.hashSync("bernard", 10),
    isAdmin: false,
  },
  {
    id: 3,
    firstName: "Claude",
    lastName: "Sonnet",
    email: "claude.sonnet@gmail.com",
    password: bcrypt.hashSync("claude", 10),
    isAdmin: false,
  },
  {
    id: 4,
    firstName: "Ludo",
    lastName: "Arena",
    email: "ludo.arena@gmail.com",
    password: bcrypt.hashSync("ludo", 10),
    isAdmin: true,
  },
];

module.exports = USERS;
