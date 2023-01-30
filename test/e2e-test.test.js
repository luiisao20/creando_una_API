// Test de integracion
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const app = require("../app").app;

describe("Suite de prueba e2e para el curso", () => {
    it("Should return Hello World!", (done) =>{
        chai.request(app)
            .get("/")
            .end((err, res) => {
                console.log("A");
                chai.assert.equal(res.text, "Hello World!")
                done();
            });
    });
});