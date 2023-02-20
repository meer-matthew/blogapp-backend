const User = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getToken } = require("../util/ReqHelper");

exports.userSignUp = (req, res, next) => {
  User.find({ emailAddress: req.body.emailAddress })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res
          .status(409)
          .json({ message: "Email Address already in use" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            emailAddress: req.body.emailAddress,
            password: hashedPassword,
            birthDate: req.body.birthDate,
            address: req.body.address,
            contactNo: req.body.contactNo,
            gender: req.body.gender,
          });
          console.log(user);
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            user
              .save()
              .then((result) => {
                const token = getToken({ user: user });
                console.log(result);
                res.status(201).json({ message: "User Created", token: token });
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.userLogin = (req, res, next) => {
  User.find({ emailAddress: req.body.emailAddress })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({ message: "Auth failed" });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        const userObj = {
          emailAddress: user[0].emailAddress,
          userId: user[0]._id,
          contactNo: user[0].contactNo,
          name: user[0].name,
          address: user[0].address,
          gender: user[0].gender,
        };
        if (err) {
          return res.status(401).json({ message: "Auth failed" });
        }
        if (result) {
          const token = getToken({ user: userObj });
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }
        res.status(401).json({ message: "Auth failed" });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "hi" });
    });
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .populate("posts", "content")
    .exec()
    .then((user) => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updateOperation = {};
  for (const op of req.body) {
    updateOperation[op.key] = op.value;
  }
  User.updateOne({ _id: userId }, { $set: updateOperation })
    .exec()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.deleteUser = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.signout = (req, res, next) => {
  try {
    req.headers = null;
    return res.status(200).send({
      message: "User signed out",
      token: req.headers,
    });
  } catch (err) {}
};
