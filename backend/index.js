

const express = require('express')
const cors =require ('cors');
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

const connectDB= require('./database/mydb.js');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
connectDB();

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(port, () => {
  console.log(`app listening at 3001`);
});