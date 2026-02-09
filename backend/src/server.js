require("dotenv").config();
const express = require("express");
const cors = require("cors");
const leadRoutes = require("./routes/lead");
const { initDb } = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const defaultOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "https://difc-zabeel.netlify.app",
];
const extraOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((u) => u.trim()).filter(Boolean)
  : [];
const allowedOrigins = [...new Set([...defaultOrigins, ...extraOrigins])];

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

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database init failed:", err.message);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
