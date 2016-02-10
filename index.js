var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var app = express();

var url = 'mongodb://10.0.0.44:27017/test';

var getmongo = function(db,score,callback) {
  var results = [];
  var query = {"grades.score":{$gt:score}}; 
  console.log(query);
  var cursor = db.collection('restaurants').find(query,{"name":1});
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

app.get('/:score', function (req, res) {
  var gs = parseInt(req.params.score,10);
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);

    getmongo(db,gs,function(docs){
      res.json(docs);
    });
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
