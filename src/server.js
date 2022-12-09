const express = require('express');
const {dbConnect} = require('./config/dbConnect');
var bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

const getkeyRouter = require('./routers/getkeyRouter');
const loginRouter = require('./routers/loginRouter');
const registerRouter = require('./routers/registerRouter');

app.use('/get_key',getkeyRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.listen(port, dbConnect());