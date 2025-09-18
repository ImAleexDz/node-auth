const express = require('express');
const app = express();
const port = 3000;
const sequelize = require('./config/db');
require('./models/user');

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

// Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
