const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const { notFoundMiddleware, authMiddleware } = require('./core/middleware');
const { connectToDb, app, httpServer } = require('./core/utils');
const { registrationModule, authModule } = require('./modules');

const PORT = process.env.PORT || 3000;

app.use(
  require('express-session')({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(authMiddleware);

app.use('/api/registration', registrationModule);
app.use('/api/auth', authModule);

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
