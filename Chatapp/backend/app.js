const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');


// imports  from code ---
const connectionDB = require('./database/connection');
const authRouter = require('./routes/auth.router');
const messageRouter = require('./routes/message.router');
const { io, app, server } = require('./lib/socket')

const port = process.env.PORT;
// express app will be removed from here ----------- <=
// const app = express(); <= ----------- <=


// middlewares
app.use(express.json({ limit: "50mb" }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());





app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

connectionDB();


server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})