// Ojo con passport

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const usersController = require('../users.controller')
const teamsController = require('../../teams/teams.controller')
const app = require("../../app").app;

beforeEach(async() => {
    await usersController.registerUser("Lucho", "1234");
})

afterEach(async() => {
    await usersController.cleanUpUsers();
    await teamsController.cleanUpTeam();
})

describe("Suite de pruebas auth", () => {
    it("Should return 401 when no jwt token available", (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .get("/teams")
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });

    it("Should return 400 when no data is provided", (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
            .post("/auth/login")
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 400);
                done();
            });
    });

    
    // it("Should return 200 and token for succesful login", (done) => {
    //     // Cuando la llamada no tiene correctamente la llave
    //     chai.request(app)
    //         .post("/auth/login")
    //         .set('content-type', 'application/json')
    //         .send({user: 'Lucho', password: '1234'})
    //         .end((err, res) => {
    //             chai.assert.equal(res.statusCode, 200);
    //             done();
    //         });
    // });
    
    it("Should return 200 when jwt is valid AAAA", (done) => {
        // Cuando la llamada no tiene correctamente la llave
        chai.request(app)
        // El usuario se logea
        .post("/auth/login")
        .set('content-type', 'application/json')
        .send({user: 'Lucho', password: '1234'})
        // Miramos res que es la respuesta del login
        .end((err, res) => {
            chai.assert.equal(res.statusCode, 200);
            chai.request(app)
            .get("/teams")
            // Tomamos el token
            .set("Authorization", `JWT ${res.body.token}`)
            // Y con el token probamos la llamada de la autorizacion
            .end((err, res) => {
                // Si se logo correctamente, damos un 200
                chai.assert.equal(res.statusCode, 200);
                done();
            });
        });
    });
    
    it('should return 200 and token for succesful login', (done) =>{
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'LuisBravo', password: '1234'})
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200);
                done()
            });
    });

});
