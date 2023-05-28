const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
    try {
      const post = await Post.findById(req.body.post);
      if (post) {
        const comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id
        });
        post.comments.push(comment);
        await post.save();
        req.flash('success',"comment added");
        res.redirect('/');
        
      }
    } catch (err) {
      req.flash('error',err);
    }
  }
  

//   module.exports.destroy = function(req,res){

//     Comment.findById(req.params.id,function(err,comment){
//         if(comment.user == req.user.id){
//             let postId = comment.post;

//             comment.remove();
//             Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
//                 return redirect('back');
//             });
//         }else{
//             return redirect('back');
//         }
//     });
//   }


module.exports.destroy = async function(req, res) {
    try {
      const comment = await Comment.findById(req.params.id);
      if (comment.user == req.user.id) {
        let postId = comment.post;
        await Comment.deleteOne({ _id: req.params.id });
        await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
        req.flash('success',"Comment Deleted");
        return res.redirect('back');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.log(err);
      req.flash('error',err);
    }
  }