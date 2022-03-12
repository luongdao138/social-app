require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  return res.json({ msg: 'Hello world' });
});

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
