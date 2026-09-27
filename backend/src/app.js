const express = require("express");
const cors = require("cors");
const productsRoutes = require("./routes/products.routes");
const pricesRoutes = require("./routes/prices.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
})
app.use("/api/products", productsRoutes);
app.use("/api/prices", pricesRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal server error", detail: err.message });
});
module.exports = app;
