const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const usersController = require('../controllers/user')

router.route('/')
    .get((req, res) => {
        res.send('Auth router');
    })
    .post((req, res) => {
        res.send('Auth router')
    })

router.route('/login')
    .post((req, res) => {
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
    });

exports.router = router;