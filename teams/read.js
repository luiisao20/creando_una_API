let pokemonName = req.body.name;

let [pokeApiError, pokeApiResponse] = 
    await to(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`))

if (pokeApiError) {
    return res.status(400).json({message: pokeApiError});
}

let pokemon = {
    name: pokemonName,
    pokedexNumber: pokeApiResponse.data.id
}

let [errorAdd, response] = await to(teamsController.addPokemon(req.user.userId, pokemon));

if (errorAdd) {
    return res.status(400).json({message: 'You have already 6 pokemons'});
} else {
    response.status(201).json(pokemon);
}


try {
    await teamsController.addPokemon(req.user.userId, pokemon);
    res.status(201).json(pokemon);
} catch (error) {
    res.status(400).json({message: 'You have already 6 pokemons'});
}