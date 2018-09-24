import config from './config.js';
import apiRouter from './api';
import infoRouter from './api/infoRouter';
import path from 'path';
import session from 'client-sessions';

import express from 'express';
import bodyParser from 'body-parser';
const server = express();

server.use(bodyParser.urlencoded({extended: false, limit:'20mb'}));
server.use(bodyParser.json({limit:'5mb'}));

server.use(express.static('public'));
server.set('view engine', 'ejs');
server.use(session({
  cookieName: 'session',
  secret: 'T8MQ4OJWLvCLcVmfqZNxtsAvxx5GaT0gCo',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));
server.use('/', apiRouter);
server.use('/api', infoRouter);

server.use('*', (req, res) => {
  res.status(404).end();
});
server.listen(config.port, config.host, () => {
  console.info('Express listening on port ', config.host + ":" + config.port);
});

//schechuleds stuff
import schedule from 'node-schedule';
import * as articulos from './articulos';
let j = schedule.scheduleJob("0 2 * * *", () => {
  console.log("Realizando actualizacion diaria de articulos");
  articulos.actualizarArticulos();
});
