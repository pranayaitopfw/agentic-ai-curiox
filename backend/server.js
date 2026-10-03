require("dotenv").config();

console.log(
    "JWT_SECRET available:",
    Boolean(process.env.JWT_SECRET)
);

const express = require("express");
const cors = require("cors");

const connectDB = require("./db");
const authRoutes = require("./router/auth");

const PORT = process.env.PORT || 5000;

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "Agentic ai backend run"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`server run port-${PORT}`);
});
