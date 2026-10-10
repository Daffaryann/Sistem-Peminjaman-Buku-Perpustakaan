import express from "express";
import dotenv from "dotenv";
import loanRoutes from "./routes/loanRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Main Route
app.use("/api/loans", loanRoutes);

app.get('/', (req, res) => {

  res.json({

    message: "Perpustakaan Reizal Haidar Akmal",

    endpoints: "/api/loans"

  });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server perpustakaan berjalan di port ${PORT}`);
});