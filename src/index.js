const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

const { notFoundMiddleware } = require('./core/middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  require('express-session')({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).json({ message: 'hello world' }));

app.use(notFoundMiddleware);

const start = async () => {
  try {
    app.listen(PORT, '0.0.0.0', () =>
      console.log(`App available on http://localhost:${PORT}`),
    );
  } catch (err) {
    console.log(err);
  }
};

start();
