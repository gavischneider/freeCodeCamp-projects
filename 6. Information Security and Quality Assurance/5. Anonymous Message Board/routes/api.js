/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect       = require('chai').expect,
      MongoClient  = require('mongodb'),
      ObjectId     = require('mongodb').ObjectID,
      mongoose     = require('mongoose'),
      url          = process.env.DB; 

module.exports = function (app) {
  
  //Threads Route Handling
  app.route('/api/threads/:board')
  
    // Get thread list
    .get( (req, res) => {
      // Assign board from url to var
      let board = req.params.board;
      MongoClient.connect( url, (err, db) => {
        let collection = db.collection(board);
        collection.find(
          {},
          {
            reported: 0,
            delete_password: 0,
            "replies.delete_password": 0,
            "replies.reported": 0,
          })
          //reverse sort by Date
          .sort({bumped_on: -1})
          .limit(10)
          .toArray( (err, array) => {
            array.forEach((item) => {
              item.replycount = item.replies.length;
              if (item.replies.length > 3) {
                item.replies = item.replies.splice(-3);
              }
            });
            res.json(array);
          });
      });
    })
  
    // Post new thread
    .post( (req, res) => {
      let board = req.params.board;
      let thread = {
        text: req.body.text,
        created_on: new Date(),
        bumped_on: new Date(),
        reported: false,
        replies: [],
        delete_password: req.body.delete_password
      };
      MongoClient.connect( url, (err, db) => {
        if (err) res.send(err);
        let collection = db.collection(board);
        collection.insert(thread, () => {
          res.redirect('/b/'+board+'/');
        });
      });
    })
  
    // Report a thread
    .put( (req, res) => {
      let board = req.params.board,
          id = new ObjectId(req.body.report_id);
      MongoClient.connect( url, (err, db) => {
        if (err) res.send(err);
        let collection = db.collection(board);
        collection.findAndModify(
          {_id: id}, 
          [],
          {$set: {reported: true}},
          (err, result) => {
            if (err) res.send(err);
          });
      });
      res.send('Reported');
    })
    
    // Delete a thread
    .delete( (req, res) => {
      let board = req.params.board,
          id = new ObjectId(req.body.thread_id);
      MongoClient.connect( url, (err, db) => {
        if (err) res.send(err);
        let collection = db.collection(board);
        collection.findAndModify(
          {_id: id, 
           delete_password: req.body.delete_password},
          [],
          {},
          {remove: true, new: false},
          (err, result) => {
            if (err) {
              res.send(err);
            } else if (result.value === null) {
              res.send('Incorrect password');
            } else {
              res.send('Success');
            }
          });
      });
    });
    

  app.route('/api/replies/:board')
    .get( (req, res) => {
      let board = req.params.board;
      let id = new ObjectId(req.query.thread_id);
      //Connect to DB
      MongoClient.connect( url, (err, db) => {
        let collection = db.collection(board);
        collection.find(
          {_id: id},
          {
            reported: 0,
            delete_password: 0,
            "replies.delete_password": 0,
            "replies.reported": 0,
          })
          .toArray( (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.json(result[0]);
            }
          });
      });
    })
  
    // Post a reply
    .post( (req, res) => {
      let board = req.params.board;
      let reply = {
        _id: new ObjectId(),
        text: req.body.text,
        created_on: new Date(),
        reported: false,
        delete_password: req.body.delete_password
      };
      MongoClient.connect( url, (err, db) => {
        if (err) res.send(err);
        let collection = db.collection(board);
        let id = new ObjectId(req.body.thread_id);
        collection.findAndModify(
          {_id: id},
          [], 
          { 
            $set: {bumped_on: new Date()},
            $push: {replies: reply}
          },
          (err, result) => {});
      });
      res.redirect('/b/' + board + '/' + req.body.thread_id);
    })
  
    .put( (req, res) => {
      let board = req.params.board,
          id = new ObjectId(req.body.thread_id),
          rep_id = new ObjectId(req.body.reply_id);
      MongoClient.connect( url, (err, db) => {
        let collection = db.collection(board);
        collection.findAndModify(
          {_id: id,
          "replies._id": rep_id},
          [], //No sort
          {$set: {"replies.$.reported": true}},
          (err, result) => {
            if (err) res.send(err);
          });
      });
    })
    
    // Delete a reply
    .delete( (req, res) => {
      let board = req.params.board,
          id = new ObjectId(req.body.thread_id),
          rep_id = new ObjectId(req.body.reply_id);
      MongoClient.connect( url, (err, db) => {
        let collection = db.collection(board);
        collection.findAndModify(
          {
            _id: id,
            replies: {$elemMatch: {_id: rep_id, delete_password: req.body.delete_password}}
          },
          [], 
          {$set: {"replies.$.text": "[deleted]"}},
          (err, result) => {
            if (err) {
              res.send(err);
            } else if (result.value === null) {
              res.send('Incorrect password');
            } else {
              res.send('Success');
            }
          });
      });
    });
};