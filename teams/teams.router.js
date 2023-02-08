const express = require('express');
const router = express.Router();
const teamsHttpHandler = require('./teams.http');

router.route('/')
    .get(teamsHttpHandler.getTeamOfUser)
    .put(teamsHttpHandler.setTeamToUser)

router.route('/pokemons')
    .post(teamsHttpHandler.addPokemonToTeam)

router.route('/pokemons/:pokeid')
    .delete(teamsHttpHandler.deletePokemonFromTeam)

exports.router = router;
