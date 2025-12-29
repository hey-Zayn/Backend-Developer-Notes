const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');


// imports  from code ---
const connectionDB = require('./database/connection');
const authRouter = require('./routes/auth.router');
const messageRouter = require('./routes/message.router');


const port = process.env.PORT;
const app = express();


// middlewares
app.use(express.json());
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


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})