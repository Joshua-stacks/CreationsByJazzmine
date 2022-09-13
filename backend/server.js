const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const PORT = 8000;

const app = express();

//Server will be using cookies to store information
app.use(cookieParser());

// Server will log more information to the console.
app.use(morgan("tiny"));

// Server will recognize incoming data as JSON.
app.use(express.json());

// Requests for static files will look in public.
app.use(express.static("public"));

// Endpoints.
app.use(require("./routes/admin"));

app.use(require("./routes/products"));

app.use(require("./routes/orders"));

app.get("*", (req, res) => {
  return res.status(404).json({ status: 404, message: "No endpoint found." });
});

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
