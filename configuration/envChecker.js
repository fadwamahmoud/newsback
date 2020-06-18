require("dotenv").config();

// checks if all required env variables exist
function envChecker() {
  const required = ["PORT", "DB_HOST", "JWT_SECRET"];
  required.forEach((req) => {
    if (!process.env[req]) process.exit();
  });
}
envChecker();
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  DB_HOST: process.env.DB_HOST,
  PORT: process.env.port,
};
