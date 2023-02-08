const axios = require('axios').default;
const teamsController = require('./teams.controller');
const { getUser } = require('../auth/users.controller');
const { to } = require('../tools/to');

const getTeamOfUser = async(req, res) => {
    let [err, user] = await to(getUser(req.user.userId));
    let [teamErr, team] = await to(teamsController.getTeamOfUser(req.user.userId));
    if (teamErr) {
        return res.status(400).json({message: err});
    } else{
        res.status(200).json({
            trainer: user.userName,
            team: team
        })
    }
}

const setTeamToUser = async(req, res) => {

    let [err, resp] = await to(teamsController.setTeam(req.user.userId, req.body.team));
    if (err) {
        return res.status(400).json({message: err})
    }
    res.status(200).send();
}

const addPokemonToTeam = async (req, res) => {

    let pokemonName = req.body.name;
    
    let [pokeApiError, pokeApiResponse] = 
        await to(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`))
    console.log('calling pokeapi');
    
    if (pokeApiError) {
        return res.status(400).json({message: 'You have already 6 pokemons'});
    }
    
    let pokemon = {
        name: pokemonName,
        pokedexNumber: pokeApiResponse.data.id
    }
    
    let [errorAdd, response] = await to(teamsController.addPokemon(req.user.userId, pokemon));

    if (errorAdd) {
        return res.status(400).json({message: 'You have already 6 pokemon'})
    } 
    res.status(201).json(pokemon);

}

const deletePokemonFromTeam = async(req, res) => {
    let pokeId = req.params.pokeid;
        
    console.log("Deleting the pokemon with id = ", pokeId)
    
    let [err, resp] = await to(teamsController.deletePokemon(req.user.userId, pokeId));

    if (err) {
        return res.status(400).json({message: err});
    }
    res.status(201).json(pokeId);
}

exports.addPokemonToTeam = addPokemonToTeam;
exports.setTeamToUser = setTeamToUser;
exports.getTeamOfUser =getTeamOfUser;
exports.deletePokemonFromTeam = deletePokemonFromTeam;
