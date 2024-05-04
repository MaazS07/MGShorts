const express = require('express'); 

const app = express();
const cors = require('cors');
const path = require('path');


app.use(cors());

const connection = require('./db/connection');
const contentRoutes = require('./routes/contentRoutes');

const PORT = process.env.PORT || 3000;

app.use('/api', contentRoutes);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
