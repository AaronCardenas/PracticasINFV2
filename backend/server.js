const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

require('./app/routes/conversion.routes')(app)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
