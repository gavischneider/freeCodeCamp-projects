/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app, db) {

  app.route('/api/books')
    .get(function (req, res){
      //esponse will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      db.collection('books').find({}).toArray(function (err, books) {
        if(err) {
          res.json({status: 'Error getting books: ' + err});
        } else {
          let bookList = books.map((book) => {
            return {_id: book._id, title: book.title, commentcount: book.comments.length}
          });
          res.send(bookList)
        }
      });
    })
    
    .post(function (req, res){
      var title = req.body.title;
      let comments = [];
    
      if (title && title.length >= 1) {
        let toPost = {title: title, comments: comments}
        //response will contain new book object including atleast _id and title
        db.collection('books').insertOne(toPost, function (err, books) {
            if(err) {
              res.send('Could not insert book');
            } else {
              res.json(books.ops[0])
            }
          });
      } else {
        res.send('Book title cannot be blank')
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      db.collection('books').remove({}, function (err, books) {
        if(err) {
          res.send('Could not delete any books')
        } else {                                                    
          if (books.result.n >= 1) {                                  
            res.send('complete delete successful');
          } else {                                                             
            res.send('Could not delete any books')
          }
        }
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      // console.log(req.params.id)
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      if (bookid.length > 24 || bookid.length < 24) { 
            res.send('Could not find ' + bookid + ' because of incorrect id');
      } else {
        db.collection('books').findOne({_id: new ObjectId(bookid)}, function (err, books) {
          if(err) {
            res.json({status: 'Eror: ' +err});
          } else {
            if (books != null) {
              res.send(books)
            } else {
              res.send('Could not find ' + bookid + ' - id is incorrect');
            }
          }
        });
      }
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (bookid.length != 24) { 
            res.send('Could not update ' + bookid + ' - id is incorrect');
        } else {
            db.collection('books').findOneAndUpdate(
              {_id: ObjectId(bookid)},
              { $push: {comments: comment}}, {returnOriginal: false}, function (err, books) {
                if(err) {
                  res.send('could not update ' +bookid);
                } else {
                  console.log(books.value);
                  res.send(books.value)
                }
              });
        }
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      
      db.collection('books').findOneAndDelete(                                  
      {_id: ObjectId(bookid)}, {projection: {_id: 1}},  function (err, issue) {
        if(err) {                                              
          res.send('Could not delete ' + bookid)
        } else {                                                            
          if (issue.value != null)          
            res.send('Deleted ' + bookid);
          else                       
            res.send('Could not delete ' + bookid)
        }
      });
    });
  
};
