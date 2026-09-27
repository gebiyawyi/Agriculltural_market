require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
