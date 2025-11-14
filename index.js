
const express = require('express');
const app = express();
const port = 3002;
const sequelize = require('./config/db');
require('./models/user');

const session = require('express-session');
const passport = require('passport');
require('./config/passport');

require('dotenv').config();
const cors = require('cors');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001';
const corsOptions = {
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type','Authorization','X-Requested-With'],
  credentials: true,
  optionSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(passport.initialize())

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


// Middleware to parse JSON
app.use(express.json());

// Session and Passport middleware
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Login routes
const loginRoutes = require('./routes/login');
app.use('/api/login', loginRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;