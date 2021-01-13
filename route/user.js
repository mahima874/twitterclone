const router = require('express').Router();
const User = require('../models/user.model');
var randomstring = require("randomstring");

//signup new user
router.route('/signup').post((req, res) => {
    const {firstname, lastname, gender, email, mobile, password} = req.body;

    if(!firstname || !lastname || !gender || !email || !mobile || !password ) return res.json({msg: 'please enter all fields'});

    User.findOne({email: email})
        .then(user => {
            if(user) return res.json({msg: 'user already exists'});
        })
    
    let rand = randomstring.generate(5);
    
    const newUser = new User({
        firstname,
        lastname,
        name: firstname + " " + lastname,
        gender: gender === "Male" ? 1 : 0,
        email,
        mobile: parseInt(mobile),
        username: "@"+firstname + rand,
        password
    });

    newUser.save()
        .then(user => res.json({
            user:{
                id: user.id,
                username: user.username,
                msg: 'Welcome ' + user.name +', Your account created successfully'
            }
        }))
        .catch(err => res.json(err))
});

//signin new user
router.route('/signin').post((req, res) => {
    const {username, password} = req.body;

    if(!username || !password ) return res.json({msg: 'please enter all fields'});

    User.findOne({username: username, password: password})
        .then(user => {
            if(!user) {
                return res.json({msg: 'invalid credentials'});
            }
            else {
                return res.json({
                    user: {
                        msg: 'Hello ' + user.name + ', You are logged in successfully',
                        id: user.id,
                        username: user.username
                    }
                })
            }
        })
});

module.exports = router;