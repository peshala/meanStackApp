var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/register',function(req,res){

  if (!req.body.email){
    res.json({success:false,message:'must provide email'});
  }
  else {
    if (!req.body.username){
      res.json({success:false,message:'must provide username'});
    }
    else {
      if (!req.body.password){
        res.json({success:false,message:'must provide password'});
      }
      else {

        let user = new User({
          email  : req.body.email.toLowerCase(),
          username: req.body.username.toLowerCase(),
          password : req.body.password
        });
        User.createUser(user , function(err,user){
          if(err)throw err;
          console.log(user);
        });
        // req.flash('success_msg','you are registered');
        res.redirect('/dashboard');
        // user.save((err) => {
        //   if (err) {
        //     res.json({success:false,message:'could not save:',err})
        //   }
        //   else {
        //     res.json({success:true,message:'saved'})
        //   }
        // });
        }

      }

      }

  });



module.exports = router;
