const express = require('express');
const mongodb=require('./mongoDB.js');
const userModel=require('./userSchema');
const bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const nodemailer = require("nodemailer");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongodb();
require('dotenv').config()
app.get('/',(req,res)=> res.send('api-server'));
app.post("/signup", function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmpassword;
    if (password !== confirmPassword) {
      res.status(201).json({
        message: "Password Not Matched!",
      });
    } else {
      bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
          return res.json({
            message: "Something Wrong, Try Later!",
            error: err,
          });
        } else {
          let userDetails = new userModel({
            email: email,
            password: hash,
          });
          userDetails
            .save()
            .then((doc) => {
              let token = jwt.sign(
                {
                  email: email,
                  userid: doc._id,
                },
                "secret",
                {
                  expiresIn: "8h",
                }
              );
  
              res.status(201).json({
                message: "User Registered Successfully",
                results: doc,
                token: token,
              });
            })
            .catch((err) => {
              res.status(201).json({
                err:err,
                message: "Same email already in use",
                results: "",
                token: "",
              });
              res.json(err);
            });
        }
      });
    }
});
app.post("/login", async (req, res) => {
    let email = req.body.email;
    console.log(req.body)
    userModel
      .find({ email: email })
      .exec()
      .then(async (user) => {
        if (user.length < 1) {
          res.status(404).json({
            message: "Not found",
          });
        } else {
          bcrypt.compare(
            req.body.password,
            user[0].password,
            async (err, result) => {
              if (err) {
                res.json({
                  message: "Wrong Password",
                });
              }
              if (result) {
               
                let token = jwt.sign(
                  {
                    email: user[0].email,
                    userid: user[0]._id
                  },
                  "secret",
                  {
                    expiresIn: "8h",
                  }
                );
                res.status(200).json({
                  message: "User Found",
                  token: token,
                });
                console.log('login');
              } else {
                res.json({
                  message: "Incorrect Username/Password",
                });
              }
            }
          );
        }
      })
      .catch((err) => {
        res.json({
          error: err,
        });
      });
});
app.post('/forgot',async(req,res)=>{
    const user =await userModel.findOne({email:req.body.email});
    if(req.body.email){
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_ID, 
                pass: process.env.GOOGLE_PASSWORD
            }
        });
          // send mail with defined transport object
          let mailOptions = {
            from: 'sabhayjains@gmail.com', 
            to: req.body.email,
            subject: 'Reset your password',
            text: 'Click on this link to reset your password do not share it with other! http://localhost:3000/forgot-password/'+user._id
        };
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return log('Error occurs');
            }
            res.status(200).json({
                message: "mail sent to your email!",
            });
        });
    }
      
});
app.post('/changeit',async(req,res)=>{
    console.log(req.body);
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let user =await userModel.findById(req.body.userid);
    console.log(user)
    if (password !== confirmPassword) {
        res.status(201).json({
          message: "Password Not Matched!",
        });
        console.log('hey');
      } else {
        bcrypt.hash(password, 10, function (err, hash) {
          if (err) {
            return res.json({
              message: "Something Wrong, Try Later!",
              error: err,
            });
          } else {
            user.password=hash;
            console.log(hash)
            user.save();    
            return res.json({
                message: "your password change successfully ",
              });
          }
        });
      }
      
});
app.listen(5000,()=> console.log("sever running on 5000"));