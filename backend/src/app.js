require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const financialRoutes = require("./routes/financialRoutes.js");
const openaiRoutes = require("./routes/openaiRoutes.js");

const PORT = process.env.PORT || 5010;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/v1/finchat/fmp", financialRoutes);
app.use("/api/v1/finchat/openai", openaiRoutes);

// PORT
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
