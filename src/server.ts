import express from "express";
import cors from "cors";
import connection from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Test route to check DB connection
app.get("/api/test-db", (req, res) => {
  connection.query("SELECT 1 + 1 AS result", (err, results: any[]) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: "Database connected!", result: results[0].result });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
