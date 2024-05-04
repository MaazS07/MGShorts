const mongoose = require('mongoose');
require('dotenv').config();


const mongoURI = process.env.MONGO_URI;



mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Atlas connection established successfully');
  })
  .catch((error) => {
    console.error('MongoDB Atlas connection error:', error.message);
  });
