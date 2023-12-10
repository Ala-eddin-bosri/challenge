const dotenv = require("dotenv");
dotenv.config(); // Charge les variables d'environnement du fichier .env

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB.");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
