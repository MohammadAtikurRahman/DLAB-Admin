// Load environment variables
require("dotenv").config();

// Import required libraries
const express = require("express");
const app = express();
const cors = require("cors");
const moment = require('moment');
const expressJwt = require('express-jwt');
const os = require('os');
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const csv = require('csv-parser');
const fs = require('fs');
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { AllTime, VideoInfo } = require("./model/user.js");

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}' from ${req.ip}`);
    next();
});




app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

app.post('/all-time', async (req, res) => {
    try {
      const newTime = new AllTime(req.body);
      const savedTime = await newTime.save();
      res.status(201).send(savedTime);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  
  // POST route for VideoInfo data
  app.post('/video-info', async (req, res) => {
    try {
      const newVideo = new VideoInfo(req.body);
      const savedVideo = await newVideo.save();
      res.status(201).send(savedVideo);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });






app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
