const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');

const {
  notFoundMiddleware,
  authMiddleware,
  sessionMiddleware,
} = require('./core/middleware');
const { connectToDb, app, httpServer } = require('./core/utils');
const {
  registrationModule,
  authModule,
  adViewerModule,
  adManagerModule,
  communicationModule,
} = require('./api');

const PORT = process.env.PORT || 3000;

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(authMiddleware);

app.use('/api/registration', registrationModule);
app.use('/api/auth', authModule);
app.use('/api/ad-viewer', adViewerModule);
app.use('/api/ad-manager', adManagerModule);
app.use('/api/communication', communicationModule);
app.use(express.static('public'));

app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectToDb();

    httpServer.listen(PORT, '0.0.0.0', () =>
      console.log(`App available on http://localhost:${PORT}`),
    );
  } catch (err) {
    console.log(err);
  }
};

start();
