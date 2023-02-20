const Posts = require("../models/posts.model");
const mongoose = require("mongoose");

exports.getAllPosts = (req, res, next) => {
  Posts.find()
    .sort({ timestamp: -1 })
    .select("user content _id timestamp")
    .populate("user", "name")
    .exec()
    .then((post) => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.createPost = (req, res, next) => {
  const post = new Posts({
    _id: new mongoose.Types.ObjectId(),
    user: req.body.userId,
    content: req.body.content,
    timestamp: req.body.timestamp,
  });

  post
    .save()
    .then((post) => {
      console.log(post);
      res.status(200).json({
        message: "POST requests to /posts",
        createdPost: post,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err: err,
      });
    });
};

exports.getPostsById = (req, res, next) => {
  const id = req.params.postId;
  Posts.findById(id)
    .populate("user")
    .sort({ timestamp: -1 })
    .exec()
    .then((doc) => {
      if (doc) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "ID not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
};

exports.getPostsByUserId = (req, res, next) => {
  const id = req.params.userId;
  Posts.find({ user: id })
    .populate("user")
    .exec()
    .then((doc) => {
      if (doc) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "ID not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err });
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Posts.remove({ _id: postId })
    .exec()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  const updateOperation = {};
  for (const op of req.body) {
    updateOperation[op.propName] = op.value;
  }
  Posts.updateOne({ _id: postId }, { $set: updateOperation })
    .exec()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
