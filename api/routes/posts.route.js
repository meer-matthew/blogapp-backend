const express = require("express");
const router = express.Router();
const PostController = require("../controller/posts.controller");
const authChecker = require("../middleware/auth-check");

router.get("/", PostController.getAllPosts);

router.post("/", authChecker, PostController.createPost);

router.get("/:postId", authChecker, PostController.getPostsById);

router.get("/user/:userId", authChecker, PostController.getPostsByUserId);

router.delete("/:postId", authChecker, PostController.deletePost);

router.patch("/:postId", authChecker, PostController.updatePost);

module.exports = router;
