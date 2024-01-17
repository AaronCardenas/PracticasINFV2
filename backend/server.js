const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ alter: true }).then(() => {
    console.log("Actualización de base de datos lista.");
});

app.get("/", (req, res) => {
  res.json({ message: "Aplicacion funcionando." });
});

// Importacion de Router principal
require('./app/routes/main.router')(app)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
