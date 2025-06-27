//Imports
const express = require('express');
const mongoose = require('mongoose');
const assessmentRoutes = require('./routes');
const cors = require('cors');
// const bodyParser = require('body-parser');
require('dotenv').config();

//Create Express and middleware
const app = express();
app.use(express.json());
app.use(cors());

//Constants
const mongoUri = process.env.MONGO_URI;
const PORT = 5000;

//MongoDb connection
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDb connection error:', err));



//Use assessment routes
app.use('/', assessmentRoutes);

//Fire up the server
app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`);
});
