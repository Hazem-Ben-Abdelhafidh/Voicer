const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser= require('cookie-parser');
const xss = require("xss-clean");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes.js");
const helmet = require("helmet");
const globalErrorHandler = require("./controllers/errorController");
process.on("uncaughtException", (err) => {
  console.log(err.name);
  console.log(err.message);
  console.log("shutting down...");
  process.exit(1);
});
const AppError = require("./utils/appError");
const hpp = require("hpp");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port = 5000;
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cookieParser());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "too many requests please try again in an hour",
});
app.use(helmet());
app.use("", limiter);

const URL = process.env.DATABASE_URL;
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected!"));
app.listen(port, () => console.log(`App running on port ${port}`));

app.use('/users',userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);



process.on("unhandledRejection", (err) => {
  console.log(err.name);
  console.log(err.message);
  console.log("shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
