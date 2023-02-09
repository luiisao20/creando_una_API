const uuid = require("uuid");
const crypto = require("../tools/crypto.js");
const teams = require('../teams/teams.controller');
const { to } = require('../tools/to')
const mongoose = require('mongoose');
const UserModel = mongoose.model('UserModel', 
    { userName: String, password: String, userId: String });

// userId -> password

const cleanUpUsers = () =>{
    return new Promise(async(resolve, reject) => {
        let [err, result] = await to(UserModel.deleteMany({}).exec());
        if (err) {
            return reject(err);
        }
        resolve(result);
    })
}

const registerUser = (userName, password) => {
    return new Promise(async(resolve, reject) =>{
        let hashedPwd = crypto.hashPasswordSync(password);
        let userId = uuid.v4();
        // Guardar en la base de datos nuestro usuario
        let newUser = new UserModel({
            userId: userId,
            userName: userName,
            password: hashedPwd
        })
        await newUser.save();
        await teams.bootstrapTeam(userId);
        resolve();
    });
}

const getUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        let [err, result]= await to(UserModel.findOne({userId: userId}).exec());
        if (err) {
            return reject(err);
        }
        resolve(result);
    });
}

const getUserIdFromUserName = (userName) => {
    return new Promise(async(resolve, reject) => {
        let [err, result] = await to(UserModel.findOne({userName: userName}).exec());
        if (err) {
            return reject(err);
        }
        resolve(result);
    });
}

const checkUserCredentials = (userName, password) => {
    return new Promise(async(resolve, reject) => {
        let [err, user] = await to(getUserIdFromUserName(userName));
        if (!err || user) {
            crypto.comparePassword(password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } else {
            reject(err);
        }
    });
}

exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
exports.getUserIdFromUserName = getUserIdFromUserName;
exports.getUser = getUser;
exports.cleanUpUsers = cleanUpUsers;