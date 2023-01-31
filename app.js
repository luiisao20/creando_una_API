const express = require("express");
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

// Routes
const authRoutes = require('./auth/auth.router').router;
const teamsRoutes = require('./teams/teams.router').router;

const app = express();

const port = 3000;

middlewares.setupMiddlewares(app);
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