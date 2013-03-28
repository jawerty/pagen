//PREREQUISITES
var mongoose = require('mongoose')
var Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;


//process.env.MONGOHQ_URL is for deploying on heroku
var db_url = process.env.MONGOHQ_URL || "mongodb://localhost:27017/pagen_blog", 
    db = mongoose.connect(db_url);

//The MongoDB Schema for your posts

var postSchema = new Schema({
    id: ObjectId,
    title: String,
    content: String,
    date: String
})

//The MongoDB Schema for your each post's comments
var commentSchema = new Schema({
	id: ObjectId,
	postid: String,
    title_sub: String,
	name: String,
	comment: String,
	date: String
})


var post = db.model('post', postSchema);
var comment = db.model('comment', commentSchema);