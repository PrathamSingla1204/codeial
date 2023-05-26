const Post = require('../models/post');
const User = require('../models/user');
module.exports.home = async function(req, res) {
  try {
    const posts = await Post.find({})
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      });
    const users = await User.find({});
    return res.render('home', {
      title: "Codeial | Home",
      posts: posts,
      all_users: users
    });
  } catch (err) {
    console.log(err);
  }
}


// module.exports.home = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 25);

//     // Post.find({}, function(err, posts){
//     //     return res.render('home', {
//     //         title: "Codeial | Home",
//     //         posts:  posts
//     //     });
//     // });

//     // populate the user of each post
//     Post.find({}).populate('user').exec(function(err, posts){
//         return res.render('home', {
//             title: "Codeial | Home",
//             posts:  posts
//         });
//     })

// }

// // module.exports.actionName = function(req, res){}