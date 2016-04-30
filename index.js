var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var path = require('path');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var url = 'mongodb://10.0.0.44:27017/test';

/*
 * Query function defintion
 */
var restCuisine = function(db,callback) {
  var results = [];
  var query = "cuisine";
  console.log(query);
  var cursor = db.collection('restaurants')
    .distinct(query,function(err,docs){
      console.log(docs);
      callback(docs);
    })
};
var getRestWithCuisine = function(db,cuisine,callback) {
  var results = [];
  var query = {"cuisine":cuisine};
  console.log(query);
  var cursor = db.collection('restaurants').find(query);
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if(doc != null) {
        results.push(doc);
      }else {
        //console.log(results);
        callback(results);
        db.close();
      }
   });
};
var restScore = function(db,score,callback) {
  var results = [];
  var query = {"grades.score":{$gt:score}};
  console.log(query);
  var cursor = db.collection('restaurants').find(query);
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if(doc != null) {
        results.push(doc);
      }else {
        //console.log(results);
        callback(results);
        db.close();
      }
   });
};
var restGrade = function(db,grade,callback) {
  var results = [];
  var query = {"grades.grade":grade};
  console.log(query);
  var cursor = db.collection('restaurants').find(query);
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if(doc != null) {
        results.push(doc);
      }else {
        //console.log(results);
        callback(results);
        db.close();
      }
   });
};

/*
 * API defintion
 */
app.get('/', function (req, res) {
  res.render('index',{title:'index'});
});
app.get('/cuisine', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    restCuisine(db,function(cuisine){
      res.render('cuisine',{results:cuisine});
    });
  });
});

app.get('/cuisine/:cuisine', function (req, res) {
  var c = req.params.cuisine;
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    getRestWithCuisine(db,c,function(docs){
      res.render('doc',{results:docs});
    });
  });
});

app.get('/score/:score', function (req, res) {
  var gs = parseInt(req.params.score,10);
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    restScore(db,gs,function(docs){
      res.render('doc',{results:docs});
    });
  });
});
app.get('/grade/:grade', function (req, res) {
  var g = req.params.grade;
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    restGrade(db,g,function(docs){
      res.render('doc',{results:docs});
    });
  });
});

/*
 * Server defintion
 */

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
