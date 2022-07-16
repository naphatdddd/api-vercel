require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  DOMAIN: process.env.DOMAIN,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
