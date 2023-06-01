const { JsonWebTokenError } = require('jsonwebtoken');
const User = require('../../../models/user');

const jwt = require('jsonwebtoken');

module.exports.createSession = async (req,res)=>{
    
    try{

            let user = await User.findOne({email:req.body.email});

            if(!user || user.password != req.body.password){
                return res.json(422,{
                    message:"INVALID USERNAME OR PASSWORD"
                });
            }

            return res.json(200,{
                message:"Sign in successful,here is ur token ,please keep it safe! ",
                data:{
                    token :jwt.sign(user.toJSON(),'codeial',{expiresIn:'600000'})
                }
            })

    }catch(err){

    }
}