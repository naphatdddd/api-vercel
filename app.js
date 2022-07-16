const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require("./config/index");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const passportJWT = require("./middleware/passportJWT");
const checkAdmin = require("./middleware/checkAdmin");
const errorHandler = require("./middleware/errorHandler");
//connect db
const mongoose = require("mongoose");
mongoose
  .connect(config.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connect Database");
  })
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const staffRouter = require("./routes/staff");
const shopRouter = require("./routes/shop");
const menuRouter = require("./routes/menu");
// const productReactRouter = require("./routes/productReact");

const app = express();

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 10 * 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

app.use(cors());
app.use(helmet());
app.use(passport.initialize());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/user", userRouter);
app.use("/api/staff", [passportJWT.isLogin], [checkAdmin.isAdmin], staffRouter);
app.use("/api/shop", shopRouter);
app.use("/api/menu", menuRouter);
// app.use("/api/product", productReactRouter);

//middleware
app.use(errorHandler);
module.exports = app;
