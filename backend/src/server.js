require("dotenv").config();
const express = require("express");
const cors = require("cors");
const leadRoutes = require("./routes/lead");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = (
  process.env.FRONTEND_URL ||
  "http://localhost:5174,http://localhost:5173,https://nakheel-at-dubai-islands.netlify.app"
)
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());

// Routes
app.use("/api/leads", leadRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
