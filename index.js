//import config
const baseConfig =  require('./config/base.config');

//import express
const express = require('express')
const cors = require('cors');
const app = express();
const port = 5000;
const urlApi = "/api";

const multer = require('multer');
const upload = multer();

app.use(cors());
app.use(upload.array());

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false}));

require('./routes/api.route')(app,urlApi);

app.listen(port, () => {
    console.log(`server is running on port ${port} and url ${baseConfig.base_url}`);
});