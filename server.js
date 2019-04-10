const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
var morgan = require("morgan");

const users = require("./routes/api/users");
const clients = require("./routes/api/clients");
const staff = require("./routes/api/staff");

const app = express();

// Prevent 304 Not Modified code in development
app.use((req, res, next) => {
  req.headers["if-none-match"] = "no-match-for-this";
  next();
});

app.use(morgan("dev"));

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/clients", clients);
app.use("/api/staff", staff);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}...`));
