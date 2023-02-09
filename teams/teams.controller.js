const mongoose = require('mongoose');
const TeamsModel = mongoose.model('TeamsModel', 
    { userId: String, team: []});
const { to } = require('../tools/to')

const cleanUpTeam = () => {
    return new Promise(async(resolve, reject) =>{
        await UserModel.deleteMany({}).exec();
        resolve();
    })
}

const bootstrapTeam = (userId) => {
    return new Promise(async(resolve, reject) => {
        let newTeam = new TeamsModel({userId: userId, team: []});
        await newTeam.save();
        resolve();
    })
}

const addPokemon = (userId, pokemon) => {
    return new Promise(async(resolve, reject) => {
        let [err, dbteam] = await to(TeamsModel.findOne({userId: userId}).exec());
        if (err) {
            return reject(err);
        }
        if (dbteam.team.length == 6) {
            reject('Already have 6 pokemons');
        } else {
            dbteam.team.push(pokemon);
            await dbteam.save();
            resolve();
        }
    })
}

const getTeamOfUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        let [err, dbteam] = await to(TeamsModel.findOne({userId: userId}).exec());
        if (err) {
            return reject(err);
        }
        resolve(dbteam.team);
    })
}

const setTeam = (userId, team) => {
    return new Promise(async(resolve, reject) => {
        let [err, dbteam] = await to(TeamsModel.findOne({userId: userId}).exec());
        if (err) {
            return reject(err);
        }
        dbteam.team = team;
        await dbteam.save();
        resolve();
    })
}

const deletePokemon = (userId, index) => {
    return new Promise(async(resolve, reject) => {
        let [err, dbteam] = await to(TeamsModel.findOne({userId: userId}).exec());
        if (err) {
            return reject(err);
        }
        if (dbteam.team[index]) {
            dbteam.team.splice(index, 1);
        }
        await dbteam.save();
        resolve();
    })

}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemon = deletePokemon;