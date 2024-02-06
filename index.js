const express = require("express");
const {  connectMongoDb } = require("./connection");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

connectMongoDb("mongodb+srv://deepakkumarkar:deepak9153@cluster0.x2ieknr.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("Mongodb Connected"))
.catch(err => console.log("connection failed", err));


const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/url" , restrictToLoggedinUserOnly ,urlRoute);
app.use("/",checkAuth,staticRoute);
app.use("/user", userRoute);


app.listen(PORT, () => console.log(`server is hosted http://localhost:${PORT}`));