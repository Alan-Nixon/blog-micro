const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const controller = require('./controller');
const grpc = require('./Grpc')


const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({
    origin: process.env.API_GATE_WAY,
    credentials: true,
}));

app.use(cookieParser());
app.use(session({
    secret: "processenvSESSION_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



app.get('/IsLoggedIn', controller.isLoggedIn);
app.post('/postLogin',controller.postLogin);
app.post('/signup',controller.signup);


module.exports = app;
