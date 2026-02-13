require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/db');
const app = express();
const port = process.env.PORT;
const appName = 'fxlog'

connectToDB();

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server is now running Port ${port}`));