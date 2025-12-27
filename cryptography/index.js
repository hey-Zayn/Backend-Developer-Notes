const express = require("express");

const app = express();


app.use(express.json());
app.use("/data", require("./routers/data.router"));

app.get('/', (req, res) => {
    res.send("Hello World");
})






app.listen(3000, () => {
    console.log("Server started on port 3000");
});
