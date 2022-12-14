const express = require('express');
const {dbConnect} = require('./config/dbConnect');
const cors = require('cors');
var bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });
  app.use(cors());

const getkeyRouter = require('./routers/getkeyRouter');
const loginRouter = require('./routers/loginRouter');
const registerRouter = require('./routers/registerRouter');
const verifyUserRouter = require('./routers/verifyUserRouter');
const resendMailRouter = require('./routers/resendMailRouter');
const verifyLoginRouter = require('./routers/verifyLoginRouter');
const balanceRouter = require('./routers/balanceRouter');
const transferRouter = require('./routers/transferRouter');
const verifyTransferRouter = require('./routers/verifyTransferRouter');
const tranhisRouter = require('./routers/tranhisRouter');

app.use('/get_key',getkeyRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/verify_user', verifyUserRouter);
app.use('/resend_mail', resendMailRouter);
app.use('/verify_login', verifyLoginRouter);    
app.use('/balance', balanceRouter);
app.use('/transfer', transferRouter);
app.use('/verify_transfer', verifyTransferRouter);
app.use('/tranhis', tranhisRouter);

app.listen(port, dbConnect());