const User = require('../models/user');


// module.exports.profile = function(req, res){
//      User.findById(req.params.id,function(err,user){
//         return res.render('user_profile', {
//             title: 'User Profile',
//             profile_user:user
        
//     });
//     });
// }

module.exports.profile = async function(req, res) {
    try {
      const user = await User.findById(req.params.id);
      return res.render('user_profile', {
        title: 'User Profile',
        profile_user: user
      });
    } catch (err) {
        req.flash('error',err);
    }
  }
  

  module.exports.update = async function(req, res) {
    if (req.user.id == req.params.id) {
        try {
            await User.findByIdAndUpdate(req.params.id, req.body);
            return res.redirect('back');
        } catch (err) {
            req.flash('error',err);
        }
    } else {
        return res.status(401).send('Unauthorized');
    }
}
// render the sign up page
module.exports.signUp = function(req, res){
   if(req.isAuthenticated()){
   return res.redirect('/users/profile');
   }
   
   
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
       }
       
   
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = async function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({email: req.body.email});
        if (!user){
            await User.create(req.body);
            req.flash('success',"Account Created");
            return res.redirect('/users/sign-in');
        } else {
            req.flash('error','Account cant be created');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('error in finding/creating user while signing up', err);
        return;
    }
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged In Succesfully');
    return res.redirect('/');
}
module.exports.destroySession =  function (req, res, next) {
    req.flash('success','Logged Out');
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
}
