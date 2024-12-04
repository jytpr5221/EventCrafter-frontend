require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT= process.env.PORT || 8000
const app = express();
const orgRouter = require('./src/organizers/routes/organizer.js');
const eventRouter = require('./src/events/routes/events.js');
const customerRouter = require('./src/customer/routes/customer.js');
const { restrictToLoggedInUsers } = require('./src/middlewares/middleware.js');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const databaseUrl = process.env.DATABASE_URL;
mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('db connected'))
  .catch(() => console.log('db connection failed'));

app.use('/org', orgRouter);
app.use('/events', restrictToLoggedInUsers, eventRouter);
app.use('/customer', customerRouter);


app.listen(PORT, () => {
  console.log('server started');
});
