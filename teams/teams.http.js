const axios = require('axios').default;
const teamsController = require('./teams.controller');
const { getUser } = require('../auth/users.controller');

const getTeamOfUser = (req, res) => {
    let user = getUser(req.user.userId);
    res.status(200).json({
        trainer: user.userName,
        team: teamsController.getTeamOfUser(req.user.userId)
    })
}

const setTeamToUser = (req, res) => {
    teamsController.setTeam(req.user.userId, req.body.team);
    res.status(200).send();
}

const addPokemonToTeam = (req, res) => {
    let pokemonName = req.body.name;
    console.log('calling pokeapi');
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then(function (response) {
            // handle success
            let pokemon = {
                name: pokemonName,
                pokedexNumber: response.data.id
            }
            teamsController.addPokemon(req.user.userId, pokemon);

            res.status(201).json(pokemon);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.status(400).json({message: error});
        })
        .then(function () {
            // always executed
        });
}

const deletePokemonFromTeam = (req, res) => {
    let pokeId = req.params.pokeid;
        
    console.log("Deleting the pokemon with id = ", pokeId)
    
    teamsController.deletePokemon(req.user.userId, pokeId);
    res.status(201).json(pokeId);
}

exports.addPokemonToTeam = addPokemonToTeam;
exports.setTeamToUser = setTeamToUser;
exports.getgetTeamOfUser =getTeamOfUser;
exports.deletePokemonFromTeam = deletePokemonFromTeam;