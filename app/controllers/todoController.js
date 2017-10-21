var Task = require('../models/task');
var List = require('../models/List');
var redis = require('redis');
var redis_conf = require('../../config/database');   
var mongoose = require('mongoose');     
const listKey = "user1:"     

var redis_client = redis.createClient(redis_conf.port,redis_conf.host,redis_conf.db);

module.exports = {

    
   getTodos: function (req, res) {
                 getTasks(req,res);
      
            },
    getLists: function (req, res) {
                 getLists(res);
      
            },        

  // create todo and send back all todos after creation
  // addTodos : function (req, res) {
  //       Task.create({
  //           list_id: req.body.list_id,
  //           text: req.body.text,
  //           done: false
  //       }, function (err, todo) {
  //           if (err)
  //               res.send(err);
  //               req.params.list_id =req.body.list_id;
  //           getTasks(req,res);
  //       });

  //   },

addTodos : function (req, res) {
    var key = listKey + req.body.list_id;
    redis_client.rpush([key, req.body.text], function(err, reply) {
         req.params.list_id =req.body.list_id;
            getTasks(req,res);
    });

    },

  addList : function (req, res) {

    List.create({
            name: req.body.name,
            done: false
        }, function (err, list) { 
            if (err)
                res.send(err);
             res.json(list); 
            
        });
    },

    // delete a todo
  // deleteTodo : function (req, res) {
  //       Task.remove({
  //           _id: req.params.todo_id
  //       }, function (err, todo) {
  //           if (err)
  //               res.send(err);

  //           getTasks(req,res);
  //       });
  //   }

  deleteTodo : function (req, res) {
        var key = listKey + req.params.list_id;
        redis_client.LTRIM(key, 0,-2, function(err, reply) { 
                getTasks(req,res);
        });
  }
   

    
};

// utility functions

// function getTasks(req,res) { 
//     Task.find({list_id:req.params.list_id},function (err, todos) {

//         if (err) {
//             res.send(err);
//         }

//         res.json(todos); 
//     });
// };

function getTasks(req,res) { 
    var key = listKey + req.params.list_id;
    redis_client.lrange(key, 0, -1, function(err, todos) { 
        if (err) {
            res.send(err);
        }

        res.json(todos); 
    });
};

function getLists(res) {
    List.find(function (err, lists) {  
        if (err) {
            res.send(err);
        }

        res.json(lists); 
    });
};
