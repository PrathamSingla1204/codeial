const Post = require('../models/post');
module.exports.create = async function(req, res) {
    try {
      await Post.create({
        content: req.body.content,
        user: req.user._id
      });
    } catch (err) {
      console.log('Error in creating Post');
    }
    return res.redirect('back');
  }
  
