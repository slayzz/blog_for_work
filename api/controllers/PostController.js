/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var util = require('util');
module.exports = {

  new : function(req,res){
    console.log((req.params));
  },

  create: function (req, res) {

    var params = {
      description: req.param('description'),
      content: req.param('content'),
      title: req.param('title')
    };
    console.log(params);
    Post.create(params).exec(function (err, post) {
      console.log(JSON.stringify(post) + 'Белеберда');
      console.error(err);
      if (err) return res.send(500);
      res.redirect('/post/watch/' + post.id);

    });
  }
  ,

  predcreate: function (req, res) {
    res.send('hello world');
  },

  update: function (req, res) {
    var Id = req.param('id');

    var elem = {
      description: req.param('description'),
      content: req.param('content'),
      title: req.param('title')
    };

    Post.update(Id, elem).exec(function (err) {
      if (err) {
        console.error(err);
        return res.send(500);

      }
      res.redirect('/');
    });
  }
  ,

  delete: function (req, res) {
    var Id = req.param('id');
    Post.destroy(Id).exec(function (err) {
      if (err) return res.send(500);
      res.redirect('/post');
    });
  }
  ,

  index: function (req, res) {
    Post.find()
      .sort('id DESC')
      .limit(5)
      .exec(function (err, posts) {
        if (err) return res.send(500);
        res.view({
          posts: posts
        });
      });
  }
  ,


  watch: function (req, res) {
    var Id = req.param('id');
    Post.findOne(Id).exec(function (err, post) {
      if (!post) return res.send(404);
      if (err) return res.send(500);
      res.view({
        post: post
      });

    });
  }
  ,

  page: function (req, res) {
    var page = req.param('page');

    Post.find()
      .sort('id DESC')
      .paginate({
        page: page,
        limit: 5
      })
      .exec(function (err, posts) {
        if (err) return res.send(500);
        res.view({
          posts: posts
        });

      });
  }
  ,

  edit: function (req, res) {
    var Id = req.param('id');

    var elem = {
      description: req.param('description'),
      content: req.param('content'),
      title: req.param('title')
    };

    Post.findOne(Id, elem).exec(function (err, posts) {
      if (err) return res.send(500);
      console.log(posts);
      res.view({
        posts: posts
      });
    })
  }
}
;

