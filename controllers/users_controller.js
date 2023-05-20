module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title : "user_profile"
    });
}
 
module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title:"Sign-in"
    });
}


module.exports.signup = function(req,res){
    return res.render('user_sign_up',{
        title:"Sign-up"
    });
}