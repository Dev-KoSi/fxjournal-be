require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDB = require('./config/db');
const authRouter = require('./routers/auth-routes');
const homeRouter = require('./routers/home-routes');
const logRouter = require("./routers/posts-routes");
const profileRouter = require('./routers/profile-routes');

const app = express();
const port = process.env.PORT;
const appName = 'fxlog'

connectToDB();

app.use(cors());
app.use(express.json());

app.use(`/${appName}`, authRouter);
app.use(`/${appName}`, homeRouter);
app.use(`/${appName}`, logRouter);
app.use(`/${appName}`, profileRouter);

app.listen(port, () => console.log(`Server is now running Port ${port}`));