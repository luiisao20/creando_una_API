Objetivo: definir una API para gestionar nuestro equipo pokemon.

Acciones: 
    - Identificarlos,
    - Añadir pokemon a nuestro equipo,
    - Eliminar pokemon de nuestro equipo,
    - Consultar información de nuestro pokemon,
    - Intercambiar el orden de nuestros pokemon.

REST DESIGN:
    - Añadir pokemon: POST /team/pokemons
    - Consultar equipo: GET /team
    - Eliminar pokemon: DELETE /team/pokemons/:id
    - Intercambiar el orden de nuestro pokemon: PUT /team
    - Sistema de credenciales

Librerias a usar:
npm install -D chiaHttp
npm install -s passport-jwt
npm install passport
npm install jsonwebtoken
npn install uuid
npm install bcrypt