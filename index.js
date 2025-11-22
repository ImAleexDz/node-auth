const express = require('express');
const app = express();
require('dotenv').config(); // Move this to top

const port = process.env.PORT || 3002;
const sequelize = require('./config/db');
require('./models/user');

const session = require('express-session');
const passport = require('passport');
require('./config/passport');

const cors = require('cors');
const cookieParser = require('cookie-parser');

// MIDDLEWARE ORDER MATTERS - Apply before routes
app.use(cookieParser());

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001';
const corsOptions = {
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With'], // Fixed typo
  credentials: true,
  optionsSuccessStatus: 204 // Fixed typo
};

app.use(cors(corsOptions));
app.use(express.json()); // Move before routes
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());

// Auth routes (after middleware)
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const loginRoutes = require('./routes/login');
app.use('/api/login', loginRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server after middleware setup
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;