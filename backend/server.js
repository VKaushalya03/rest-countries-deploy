const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const favoritesRoutes = require("./routes/favorites");

const app = express();

app.use(cors(
    {
        origin: ["https://rest-countries-deploy.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true,
    }
));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the REST Countries API!");
});

app.use("/api", authRoutes);
app.use("/api/favorites", favoritesRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection failed:", err));
