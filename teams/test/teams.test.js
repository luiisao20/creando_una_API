const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const usersController = require('../../auth/users.controller')
const teamsController = require('../teams.controller')

const app = require('../../app').app;

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
                                // tiene equipo con Charizard y Blastoise
                                // { trainer: 'mastermind', team: [Pokemon]}
                                chai.assert.equal(res.statusCode, 200);
                                chai.assert.equal(res.body.trainer, 'Lucho');
                                chai.assert.equal(res.body.team.length, 1);
                                chai.assert.equal(res.body.team[0].name, pokemonName);
                                chai.assert.equal(res.body.team[0].pokedexNumber, 1);
                                done();
                            });
                    });
            });
    });

    it('should return the length of the team - 1', (done) => {
        // Cuando la llamada no tiene correctamente la llave
        let team = [
            {name: 'Charizard'}, 
            {name: 'Blastoise'}, 
            {name: 'Bulbasaur'}, 
            {name: 'Pikachu'}
        ];
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'Lucho', password: '1234'})
            .end((err, res) => {
                console.log("ESTE ES EL ACTUAL NUMERO DE POKEMONS ", team.length);
                let token = res.body.token;
                //Expect valid login
                chai.assert.equal(res.statusCode, 200);
                chai.request(app)
                    .put('/teams')
                    .send({team: team})
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.request(app)
                            // DESDE AQUI HAY QUE IMPLEMENTAR EL TEST DEL DELETE
                            .delete('/teams/pokemons/1')
                            .set('Authorization', `JWT ${token}`)
                            .end((err, res) => {
                                chai.request(app)
                                    .get('/teams')
                                    .set('Authorization', `JWT ${token}`)
                                    .end((err, res) => {
                                        console.log(res.body.team);
                                        console.log("ESTE ES EL NUEVO NUMERO DE POKEMONS ", res.body.team.length);
                                        // tiene equipo con Charizard y Blastoise
                                        // { trainer: 'mastermind', team: [Pokemon]}
                                        chai.assert.equal(res.statusCode, 200);
                                        chai.assert.equal(res.body.trainer, 'Lucho');
                                        chai.assert.equal(res.body.team.length, team.length - 1);
                                        done();
                                    });
                            });
                    });
            });
    });
});

after((done) => {
    usersController.cleanUpUsers();
    done();
});