const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { authenticate } = require("./middlewares/authenticate.middlewares")
const cors=require("cors")
require('dotenv').config();
const port = process.env.Port || 8000
const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to Homepage");
})

app.use("/user", userRouter)
app.use(authenticate)

app.listen(port, async () => {
    try {
        await connection
        console.log("connected with Database")
    } catch (err) {
        console.log(err.message)
    }
    console.log(`Server is running at Port ${process.env.Port}`);
})
