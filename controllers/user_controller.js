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
exports.login = (req, res, next) => {
    const user = User.find({ email : req.body.email })
    .exec().then(user => {
        if(user.length < 1) {
            res.status(401).json({
                message : "Username and Password doesn't match!"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err) {
                res.status(401).json({
                    message : "Username and Password doesn't match!"
                })
            }
            if(result) {
                const token = jwt.sign({
                    email : user[0].email,
                    userId : user[0]._id
                }, process.env.JWT_KEY,
                {
                    expiresIn : "1h"
                })
                res.status(200).json({
                    timestamp : timestamp.utc('YYYY/MM/DD:mm:ss'),
                    token : token
                })
            } else {
                res.status(401).json({
                    message : "Username and Password doesn't match!"
                })
            }
        })
    })
}

