const usersController = require('./users.controller')
const jwt = require("jsonwebtoken");

const loginUser = (req, res) => {
    if (!req.body) {
        return res.status(400).json({message: 'Missing data'});
    } else if (!req.body.user || !req.body.password) {
        return res.status(400).json({message: 'Missing data'});
    }
    // Comprobamos credenciales, si son validas generamos un jwt
    usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        let user = usersController.getUserIdFromUserName(req.body.user);
        const token = jwt.sign({userId: user.userId}, 'secretPassword');
        res.status(200).json(
            {token: token}
        )
    })
}

exports.loginUser = loginUser;