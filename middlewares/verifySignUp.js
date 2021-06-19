const db = require('../models');
const ROLES = ["user", "moderator", "admin"];
const User = db.user;

checkDuplicateUsername = (req, res, next) =>{
    //username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }

        if(user){
            res.status(400).send({ message: "Username already in use" });
            return;
         }
         next();
    });
};

checkRolesExisted = (req, res, next) => {
    if(req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message: 'Roles does not exist'
                });
                return;
            }
        }
    }
    next();
};

checkDuplicateNewUsername = (req, res, next) =>{
    //new username
    User.findOne({
        username: req.body.nUsername
    }).exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err });
            return;
        }

        if(user){
            res.status(400).send({ message: "Username already in use" });
            return;
         }
         next();
    });
};

const verifySignUp = {
    checkDuplicateUsername,
    checkDuplicateNewUsername,
    checkRolesExisted
};

module.exports = verifySignUp;