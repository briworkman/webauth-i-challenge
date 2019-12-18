const express = require("express");
const configureMiddleware = require("./configure-middleware.js");
const sessions = require("express-session");
const KnexSessionStore = require("connect-session-knex")(sessions);

const apiRouter = require("./api-router.js");
const knex = require("../database/dbConfig");

const server = express();

const sessionConfiguration = {
  name: "chocolatechip",
  secret: "keep it secret, keep it safe!",
  saveUninitialized: true,
  resave: false,

  store: new KnexSessionStore({
    knex,
    createtable: true,
    clearInterval: 1000 * 60 * 10,
    sidfieldname: "sid",
    tablename: "sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    heepOnly: true
  }
};

configureMiddleware(server);
server.use(sessions(sessionConfiguration));

server.use("/api", apiRouter);

module.exports = server;
