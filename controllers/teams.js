let teamsDatabase = {};

const cleanUpTeam = () => {
    for (let user in teamsDatabase) {
        teamsDatabase[user] = [];
    }
}

const bootstrapTeam = (userId) => {
    teamsDatabase[userId] = [];
}

const addPokemon = (userId, pokemon) => {
    teamsDatabase[userId].push(pokemon);
}

const getTeamOfUser = (userId) => {
    console.log('TEAMS CONTROLER TEAMSDATABASE', teamsDatabase[userId])
    return teamsDatabase[userId]
}

const setTeam = (userId, team) => {
    teamsDatabase[userId] = team;
}

exports.bootstrapTeam = bootstrapTeam;
exports.addPokemon = addPokemon;
exports.setTeam = setTeam;
exports.getTeamOfUser = getTeamOfUser;
exports.cleanUpTeam = cleanUpTeam;