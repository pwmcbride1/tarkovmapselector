const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        numOfSpins: req.body.numOfSpins,
        numOfFactory: req.body.numOfFactory,
        numOfWoods: req.body.numOfWoods,
        numOfCustoms: req.body.numOfCustoms,
        numOfInterchange: req.body.numOfInterchange,
        numOfReserve: req.body.numOfReserve,
        numOfShoreline: req.body.numOfShoreline,
        numOfLab: req.body.numOfLab,
        favorites: req.body.favorites
    });

    user.save((err, user) => {
        if(err) {
            res.status(500).send({ message: err });
            return; 
        }

        if (req.body.roles){
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if(err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if(err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: "User successfully registered" });
                    });
                }
            );
        }
        else{
            Role.findOne({ name: "user" }, (err, role) => {
                if(err){
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "User successfully registered" });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .populate("roles", "-__v")
    .exec((err, user) => {
        if(err){
            res.status(500).send({ message: err });
            return;
        }

        if (!user){
            return res.status(404).send({ message: "User not found" });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password"
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hrs
        });

        var authorities = [];

        for (let i = 0; i<user.roles.length; i++){
            authorities.push("Role_" + user.roles[i].name.toUpperCase());
        }

        res.status(200).send({
            id: user._id,
            username: user.username,
            roles: authorities,
            accessToken: token
        });
    });
};

exports.populateInfo = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .exec((err, user) => {
        if(err){
            res.status(500).send({ message: err });
            return;
        }

        if(!user){
            return res.status(500).send({ message: "User doesn't exist" });
        }

        res.status(200).send({
            email: user.email,
            numOfSpins: user.numOfSpins,
            numOfFactory: user.numOfFactory,
            numOfWoods: user.numOfWoods,
            numOfCustoms: user.numOfCustoms,
            numOfInterchange: user.numOfInterchange,
            numOfReserve: user.numOfReserve,
            numOfShoreline: user.numOfShoreline,
            numOfLab: user.numOfLab,
            favorites: user.favorites
        })
    })
};

exports.updateSpin = (req, res) =>{
    User.findOneAndUpdate({
        username: req.body.username
    }, {$inc: { numOfSpins: 1 }}).exec((err, user)=> {
        if(err){
            res.status(500).send({ message: err })
            return;
        }
        if(!user){
            return res.status(500).send({ message: "Username not found" });
        }
        res.status(200).send({
            numOfSpins: user.numOfSpins
        })
    })
};

exports.updateFactory = (req, res) => {
    User.findOneAndUpdate({
        username: req.body.username
    }, {$inc: { numOfFactory: 1 }}).exec((err, user)=> {
        if(err){
            res.status(500).send({ message: err })
            return;
        }
        if(!user){
            return res.status(500).send({ message: "Username not found" });
        }
        res.status(200).send({
            numOfFactory: user.numOfFactory
        })
    })
};

exports.updateWoods = (req, res) => {
    User.findOneAndUpdate({
        username: req.body.username
    }, {$inc: { numOfWoods: 1 }}).exec((err, user)=> {
        if(err){
            res.status(500).send({ message: err })
            return;
        }
        if(!user){
            return res.status(500).send({ message: "Username not found" });
        }
        res.status(200).send({
            numOfWoods: user.numOfWoods
        })
    })
};

exports.updateCustoms = (req, res) => {
    User.findOneAndUpdate({
        username: req.body.username
    }, {$inc: { numOfCustoms: 1 }}).exec((err, user)=> {
        if(err){
            res.status(500).send({ message: err })
            return;
        }
        if(!user){
            return res.status(500).send({ message: "Username not found" });
        }
        res.status(200).send({
            numOfCustoms: user.numOfCustoms
        })
    })
};

exports.updateInterchange = (req, res) => {
    User.findOneAndUpdate({
        username: req.body.username
    }, {$inc: { numOfInterchange: 1 }}).exec((err, user)=> {
        if(err){
            res.status(500).send({ message: err })
            return;
        }
        if(!user){
            return res.status(500).send({ message: "Username not found" });
        }
        res.status(200).send({
            numOfInterchange: user.numOfInterchange
        })
    })
};

exports.updateReserve = (req, res) => {
    User.findOneAndUpdate({
        username: req.body.username
    }, {$inc: { numOfReserve: 1 }}).exec((err, user)=> {
        if(err){
            res.status(500).send({ message: err })
            return;
        }
        if(!user){
            return res.status(500).send({ message: "Username not found" });
        }
        res.status(200).send({
            numOfReserve: user.numOfReserve
        })
    })
};

exports.updateShoreline = (req, res) => {
    User.findOneAndUpdate({
        username: req.body.username
    }, {$inc: { numOfShoreline: 1 }}).exec((err, user)=> {
        if(err){
            res.status(500).send({ message: err })
            return;
        }
        if(!user){
            return res.status(500).send({ message: "Username not found" });
        }
        res.status(200).send({
            numOfShoreline: user.numOfShoreline
        })
    })
};

exports.updateLab = (req, res) => {
    User.findOneAndUpdate({
        username: req.body.username
    }, {$inc: { numOfLab: 1 }}).exec((err, user)=> {
        if(err){
            res.status(500).send({ message: err })
            return;
        }
        if(!user){
            return res.status(500).send({ message: "Username not found" });
        }
        res.status(200).send({
            numOfLab: user.numOfLab
        })
    })
};

exports.removeFavorite = (req, res) => {
    User.findOneAndUpdate({
        username: req.body.username
    }, {$pull: { favorites: {$in: [req.body.map]}}}).exec((err, user)=> {
        if(err) {
            res.status(500).send({ message: err })
            return;
        }
        if(!user){
            return res.status(500).send({ message: "User not found" });
        }
        res.status(200).send({ 
            favorites: user.favorites
        })
    })
};

exports.addFavorite = (req, res) => {
    User.findOneAndUpdate({
        username: req.body.username
    }, {$addToSet: { favorites: [req.body.map]}}).exec((err, user) => {
        if(err){
            res.status(500).send({ message: err })
            return;
        }
        if(!user){
            return res.status(500).send({ message: "User not found" });
        }
        res.status(200).send({
            favorites: user.favorites
        })
    })
};

exports.updateEmail = (req, res) => {
    User.findOneAndUpdate({
        username: req.body.username
    }, {$set: { email: req.body.nEmail }}).exec((err, user) => {
        if(err){
            res.status(500).send({ message: err })
            return;
        }
        if(!user){
            return res.status(500).send({ message: "User not found" });
        }
        res.send({ message: "Email Updated Successfully" })
        })
};

exports.updateUsername = (req, res) => {
    User.findOneAndUpdate({
        username: req.body.username
    }, {$set: { username: req.body.nUsername }}).exec((err, user) => {
        if(err){
            res.status(500).send({ message: err })
            return;
        }
        if(!user){
            return res.status(500).send({ message: "User not found" });
        }
        res.send({ message: "Username Updates Successfully" })
    })
};