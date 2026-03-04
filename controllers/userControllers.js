const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "jamesBond";
const User = require("../models/user");


const userSignUp = async (req, res) => {

    try{

        const data = req.body;
        const user = await User.findOne({email: data.email});

        if(user){
            
            res.status(404).send("User already exists");

        }

        else{

            const hashedPassword = await bcrypt.hash(data.password, 5);

            const userData = {

                userName: data.userName,
                email: data.email,
                password: hashedPassword

            }

            const user = new User(userData)
            const savedUser = await user.save();

            res.status(200).send(savedUser)

        }
    }

    catch(error){
        res.status(400).send({error: error.message, stack: error.stack})
    }
}

const userLogin = async (req, res) => {

    try{

        const data = req.body;
        const user = await User.findOne({email: data.email});

        if(user){

            const comaprePassword = bcrypt.compare(user.password, data.password);
            
            if(comaprePassword){

                const generatedToken = jwt.sign({ email: user.email}, privateKey, {
                    expiresIn: "72h",
                    algorithm: "HS512",
                    issuer: "aarushi" 
                })

                res.status(200).send({
                    userName: user.userName,
                    email: user.email,
                    message: "Login Sucessfull!",
                    token: generatedToken
                })

            }

            else{
                res.status(404).send("Incorrect password. Login again.")
            }

        }
        else{

            res.status(404).send("User does not exist in the database! Please register.");

        }

    }

    catch(error) {

        res.status(400).send({error: error.message, stack: error.stack})
    }
}


module.exports = {
    userSignUp,
    userLogin
}