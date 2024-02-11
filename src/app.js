const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const session = require('express-session');
const cors = require('cors');

const usersRouter = require('./routes/users');
const emailRouter = require('./routes/email');
const marketplaceRouter = require('./routes/marketplace');
const subleaseRouter = require('./routes/sublease');
const ridesRouter = require('./routes/rides');
const aiRouter = require('./routes/ai');

const errorHandler = require('./middleware/errorHandler');
const db = require('./models');

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: ['http://auburnprojects.tech', 'http://localhost:3000', 'https://auburnprojects.tech',
  'https://auquest.medhakanakamedala.com', 'https://au-quest-ui.vercel.app'],
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));

app.use(session({
  secret: 'somerandomsecret',
  saveUninitialized: true,
  resave: true,
  cookie: {
    secure: false
  }
}))

require('dotenv').config();
app.use(helmet()); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        if (req.headers['x-forwarded-proto'] !== 'https')
            return res.redirect('https://' + req.headers.host + req.url);
        else
            return next();
    } else
        return next();
});

app.use('/users', usersRouter);
app.use('/email', emailRouter);
app.use('/marketplace', marketplaceRouter);
app.use('/sublease', subleaseRouter);
app.use('/rides', ridesRouter);
app.use('/ai', aiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// pass any unhandled errors to the error handler
app.use(errorHandler);

// sync our sequelize models and then start server
// force: true will wipe our database on each server restart
// this is ideal while we change the models around
//db.sequelize.sync({ force: false });

module.exports = app;
