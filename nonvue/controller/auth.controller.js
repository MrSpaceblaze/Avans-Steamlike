const ApiResponse = require('../model/response/api.response')
const auth = require('../config/authentication.config')
const User = require('../schemas/user.schema')
const secret = require('../config/config.json').secret
const Developer = require('../schemas/developer.schema').Developer
const neo = require('../neodb/seraphhelper')

function login(req, res) {

    // Get parameters from body
    let uname = req.body.username || ''
    let pass = req.body.password || ''

    // Find user with provided username
    User.findOne({ username: uname },

        function (error, foundUser) {

            // If we couldn't find that user, return a 404
            if (!foundUser) {
                res.status(404).json(new ApiResponse(404, "Couldn't find a user with username " + uname)).end()
            }

            // If the user is found check credentials
            else {

                // Check the password
                if (foundUser.password == pass) {

                    // Encode the username to a token with the secret
                    let token = auth.encodeToken(foundUser.username,secret)

                    // Return the token
                    res.status(200).json(new ApiResponse(200, token)).end()
                }

                // If the users password was not correct, return a message
                else {
                    res.status(401).json(new ApiResponse(412, "Incorrect credentials")).end()
                }

            }
        })

}

function register(req, res) {

    // Get parameters from body
    let uname = req.body.username || ''
    let pass = req.body.password || ''

    // Check if parameters are empty
    if (uname != '' || pass != '') {

        Developer.count({devUserName:uname},(err,dev)=>{
            if(dev>0){
                res.status(403).json("A developer with that name already exists").end()
            } else{
                 // Create a model
        const user = new User({
            username: uname,
            password: pass
        })

        // Check if the username already exists with a pre-hook
        User.count({ username: user.username },
        
        function (err, count) {

            // If results, the username exists
            if (count > 0) {
                res.status(412).json(new ApiResponse(412, "Username is already taken, sorry")).end()
            }

            // Username is not taken yet, insert the new user
            else {
                user.save().then(
                    neo.saveNode({"username":user.username}, "User", function() {
                        res.status(200).end()
                    })
                )
            }
        })
            }
        })

       
    }

    // Send message if parameters are empty
    else {
        res.status(412).json(new ApiResponse(412, "Please enter a username and password")).end()
    }

}

module.exports = {
    login,
    register
}