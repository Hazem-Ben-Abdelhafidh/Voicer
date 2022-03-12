const dotenv= require('dotenv');
dotenv.config();
const mongoose= require('mongoose');
const express = require('express');
const cors= require('cors');
const bodyPaser= require('body-parser');

const app= express();

const port= 3500;
app.listen(port,()=>{
    console.log(`port running on port ${port}`);
})