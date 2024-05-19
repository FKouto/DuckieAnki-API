const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // Importe o pacote cors
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");

dotenv.config();

const app = express();

// Use o middleware cors para configurar o cabeçalho Access-Control-Allow-Origin
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use("/api", userRoutes);
app.use("/auth", authRoutes);
app.use("/api", flashcardRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
