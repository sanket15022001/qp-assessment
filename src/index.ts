import express from "express";
import cors from "cors";
import groceryRoutes from "./routes/grocery.routes";
import { connectDatabase } from "./config/database";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/grocery", groceryRoutes);

connectDatabase()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

