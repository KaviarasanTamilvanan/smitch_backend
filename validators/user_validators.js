exports.signupValidator = (req, res, next) => {
    req.check('email', 'Email should not be empty').notEmpty()
    req.check('password', 'Password should not be empty').notEmpty()

    const errors = req.validationErrors()
    if(errors){
        const eachError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error : eachError})
    }
    next()
}