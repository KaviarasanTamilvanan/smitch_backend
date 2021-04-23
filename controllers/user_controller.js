const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user_model')
const timestamp = require('time-stamp');

exports.insert = (req, res, next) => {
    User.find({ email : req.body.email })
    .exec().then(user => {
        if(user.length >=1) {
            return res.status(409).json({
                message : 'Mail Already Exists!'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error : err
                    })
                } else {
                    const user = new User({
                        email : req.body.email,
                        password : hash
                    })
                    user.save()
                    .then(result => {
                        res.json({
                            created : result
                        })
                    })
                }
            })
        }
    })
}