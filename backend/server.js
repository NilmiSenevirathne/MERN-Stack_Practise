const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;
const host = 'localhost';
const router = require('./router');

app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://NilmiAma:pwd12345@cluster0.jn863.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connect = async () => {
   try {
       await mongoose.connect(uri);
       console.log('Connected to MongoDB');
   } catch (err) {
       console.error('MongoDB Connection Error:', err);
   }
};

connect();

const server = app.listen(port, host, () => {
   console.log(`Node server is listening to ${server.address().port}`);
});

app.use('/api', router);
