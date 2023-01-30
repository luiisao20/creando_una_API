const express = require("express");
const bodyParser = require('body-parser');

// Routes
const authRoutes = require('./routers/auth').router;
const teamsRoutes = require('./routers/teams').router;

const app = express();
app.use(bodyParser.json()); // Permite leer los datos en formato json de forma correcta

const port = 3000;

app.get("/", (req, res) => {
    // req es la request, la peticion
    // res es la response, la respuesta
    res.status(200).send("Hello World!");
});
app.use('/auth', authRoutes);
app.use('/teams', teamsRoutes);

app.listen(port, () => {
    console.log("server started at port 3000");
}); // Escuchar conexiones.

exports.app = app;