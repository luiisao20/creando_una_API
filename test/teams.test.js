const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const usersController = require('../controllers/user')
const teamsController = require('../controllers/teams')

const app = require('../app').app;

before((done) => {
    usersController.registerUser("LuisBravo", "1234");
    usersController.registerUser("Lucho", "1234");
    done();
});

afterEach ((done) => {
    teamsController.cleanUpTeam();
    done();
});

describe('Suite de pruebas teams', () => {
    it('Should return the team of the given user', (done) => {
        let team = [{name: 'Charizard'}, {name: 'Blastoise'}];
        chai.request(app)
            .post("/auth/login")
            .set('content-type', 'application/json')
            .send({user: 'Lucho', password: '1234'})            
            .end((err, res) => {
                let token = res.body.token;
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put("/teams")
                    .send({
                        team: team
                    })
                    .set("Authorization", `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get("/teams")
                            .set("Authorization", `JWT ${token}`)
                            .end((err, res) => {
                                // Tiene equipo con charizard y blasotise
                                // { trainer: 'AnellysCaroline', team: [pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'Lucho')
                                chai.assert.equal(res.body.team.length, team.length);
                                chai.assert.equal(res.body.team[0].name, team[0].name);
                                chai.assert.equal(res.body.team[1].name, team[1].name);
                                done();
                        });
                    });
            });
    });

    it('should return the pokedex number', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let pokemonName = 'Bulbasaur';
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'Lucho', password: '1234'})
            .end((err, res) => {
                let token = res.body.token;
                //Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .post('/teams/pokemons')
                    .send({name: pokemonName})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            .get('/teams')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                console.log('PRUEBA', res.body)
                                // tiene equipo con Charizard y Blastoise
                                // { trainer: 'mastermind', team: [Pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'Lucho');
                                chai.assert.equal(res.body.team.length, 3);
                                chai.assert.equal(res.body.team[2].name, pokemonName);
                                chai.assert.equal(res.body.team[1].pokedexNumber, 1);
                                done();
                            });
                    });
            });
    });
});

after((done) => {
    usersController.cleanUpUsers();
    done();
});