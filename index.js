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
app.use("/url" , restrictToLoggedinUserOnly , urlRoute);
app.use("/",checkAuth,staticRoute);
app.use("/user", userRoute);
app.get("/:shortId" , async (req, res) => {
  const shortId = req.params.shortId;
  try {
      const entry = await URL.findOneAndUpdate(
          { shortId },
          {
              $push: {
                  visitHistory: {
                      timestamp: Date.now(),
                  },
              },
          }
      );

      if (entry && entry.redirectURL) {
          res.redirect(entry.redirectURL);
      } else {
          // If entry is null or redirectURL is not available
          res.status(404).send("URL not found");
      }
  } catch (error) {
      console.error("Error while processing redirect:", error);
      res.status(500).send("Internal Server Error");
  }
});
app.listen(PORT, () => console.log(`server is hosted http://localhost:${PORT}`));