require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// import routes
const authRouter = require('./routes/auth');
const res = require('express/lib/response');

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.cookie('foo', 'bar');
  res.json({ msg: 'Cookie is set ' });
});

// use routes
app.use('/api/v1/auth', authRouter);

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connect to database successfully!');
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

// run app
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
