/*
File Name: Assignment2
Student's Name: Eunbee Lee
Student ID: 301083645
Date: 2020 Oct 24th
 */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



// create a reference to the model
let User = require('../models/user');


module.exports.displayBookList = (req, res, next) => {
    User.find((err, userList) => {
        if(err){
            return console.error(err);
        }else{
            //console.log(UserList);

            res.render('user/list', 
            {title: 'Contacts', 
            UserList: userList, 
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('user/add', {
        title: 'Add List',
        displayName: req.user ? req.user.displayName : ''});
}

module.exports.processingAddPage = (req, res, next) => {
    let newUser = User({
       "name" : req.body.name,
       "email" : req.body.email,
       "number" : req.body.number
    });

    User.create(newUser, (err, User) => {
      if(err){
          console.log(err);
          res.end(err);
      }else{
          // refresh the book list
          res.redirect('/user-list');
      }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    User.findById(id, (err, userToEdit) => {
       if(err){
           console.log(err);
           res.end(err);
       }else{
           //show the edit view
           res.render('user/edit', {
               title: 'Edit Contact', 
               user: userToEdit,
               displayName: req.user ? req.user.displayName : ''})
       }
    });

}

module.exports.processingEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedUser = User({
        "_id": id,
        "name" : req.body.name,
        "email" : req.body.email,
        "number" : req.body.number

    });

    User.updateOne({_id: id}, updatedUser, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            // refresh the user list
            res.redirect('/user-list');
        }
    });
}

module.exports.performDeletion = (req, res, next) => {
    let id = req.params.id;

    User.remove({_id: id}, (err) => {
    if(err){
        console.log(err);
        res.end(err);
    }else{
        // refresh the user list
        res.redirect('/user-list');
    }
    });

}





/*

//same mistake with controller/index.js
// if I put req.visitor instead of req.user,
// welcome, displayName will not work

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');



// create a reference to the model
let User = require('../models/user');


module.exports.displayBookList = (req, res, next) => {
    User.find((err, userList) => {
        if(err){
            return console.error(err);
        }else{
            //console.log(UserList);

            res.render('user/list', 
            {title: 'Contacts', 
            UserList: userList, 
            displayName: req.visitor ? req.visitor.displayName : ''});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('user/add', {
        title: 'Add List',
        displayName: req.visitor ? req.visitor.displayName : ''});
}

module.exports.processingAddPage = (req, res, next) => {
    let newUser = User({
       "name" : req.body.name,
       "email" : req.body.email,
       "number" : req.body.number
    });

    User.create(newUser, (err, User) => {
      if(err){
          console.log(err);
          res.end(err);
      }else{
          // refresh the book list
          res.redirect('/user-list');
      }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    User.findById(id, (err, userToEdit) => {
       if(err){
           console.log(err);
           res.end(err);
       }else{
           //show the edit view
           res.render('user/edit', {
               title: 'Edit Contact', 
               user: userToEdit,
               displayName: req.visitor ? req.visitor.displayName : ''})
       }
    });

}

module.exports.processingEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedUser = User({
        "_id": id,
        "name" : req.body.name,
        "email" : req.body.email,
        "number" : req.body.number

    });

    User.updateOne({_id: id}, updatedUser, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            // refresh the user list
            res.redirect('/user-list');
        }
    });
}

module.exports.performDeletion = (req, res, next) => {
    let id = req.params.id;

    User.remove({_id: id}, (err) => {
    if(err){
        console.log(err);
        res.end(err);
    }else{
        // refresh the user list
        res.redirect('/user-list');
    }
    });

}

*/