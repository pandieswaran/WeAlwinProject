const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); 
const UserRouter = require('./Routes/UrlRouting.js');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const uri = process.env.URI_STRING;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB Connection successfully");
});

// Serve static files from the 'Uploads' directory
const uploadsPath = 'C:\\Users\\Pandi Eswaran\\projects\\Shopify\\backend\\Uploads'; // Adjust the path as per your actual setup


app.use('/uploads', express.static(uploadsPath)); // Only All Photos and To View 

// Routes
app.use('/', UserRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
