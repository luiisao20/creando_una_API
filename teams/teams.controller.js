const mongoose = require('mongoose');
const TeamsModel = mongoose.model('TeamsModel', 
    { userId: String, team: []});

let teamsDatabase = {};

const cleanUpTeam = () => {
    return new Promise((resolve, reject) =>{
        for (let user in teamsDatabase) {
            teamsDatabase[user] = [];
        }
        resolve();
    })
}

const bootstrapTeam = (userId) => {
    return new Promise(async(resolve, reject) => {
        let newTeam = new TeamsModel({userId: userId, team: []});
        await newTeam.save();
        teamsDatabase[userId] = [];
        resolve();
    })
}

const addPokemon = (userId, pokemon) => {
    return new Promise((resolve, reject) => {
        if (teamsDatabase[userId].length == 6) {
            reject('Already have 6 pokemons');
        } else {
            teamsDatabase[userId].push(pokemon);
            resolve();
        }
    })
}

const getTeamOfUser = (userId) => {
    return new Promise((resolve, reject) => {
        resolve(teamsDatabase[userId]);
    })
}

const setTeam = (userId, team) => {
    return new Promise((resolve, reject) => {
        teamsDatabase[userId] = team;
        resolve();
    })
}

const deletePokemon = (userId, index) => {
    return new Promise((resolve, reject) => {
        if (teamsDatabase[userId][index]) {
            teamsDatabase[userId].splice(index, 1);
        }
        resolve();
    })

}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;
exports.deletePokemon = deletePokemon;