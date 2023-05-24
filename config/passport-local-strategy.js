const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
 
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async function(email, password, done) {
    try {
        // find a user and establish identity
        const user = await User.findOne({ email: email });
        if (!user || user.password != password) {
            console.log("Invalid Username/Password");
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.log("ERROR IN FINDING USER -->PASSPORT");
        return done(err);
    }
}));


//Serializing user to decide which key is to be kept in the cookies
passport.serializeUser((user,done)=>{
    done(null,user.id);
})


//deSerializing user from key  in the cookies
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (err) {
        console.log("Error in finding user => passport");
        return done(err);
    }
});


module.exports = passport;