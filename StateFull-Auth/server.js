const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const connectionDB = require("./Database/connection");


const port = process.env.PORT || 3000; 
const app = express();


app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("Our API");
});

app.use('/api/auth', require('./Routes/auth.route'));



connectionDB();

app.listen(port, ()=>{
    
    console.log(`Server is listening on port ${port}`);
});
