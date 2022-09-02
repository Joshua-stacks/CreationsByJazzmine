const express = require("express");
const morgan = require("morgan")

const PORT = 8000;

const app = express();
app.use(morgan("tiny"))

app.use(express.json());

// Requests for static files will look in public.
app.use(express.static("public"));

// Endpoints.
app.get("*", (req, res) => {
  return res.status(404).json({ status: 404, message: "No endpoint found." });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));