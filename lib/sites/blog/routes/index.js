var mongoose = require('mongoose');
var db       = require('../db');
var post     = mongoose.model('post');
var comments = mongoose.model('comment')
var date     = new Date();
var error;

title = 'My Pagen'

admin_check = function(admin_check){
  if (admin_check == 'true'){
  	admin = true
  }else{
  	admin = false
  }
  return admin
};

formatTime = function(){
  //specific time
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  //date
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var day = date.getDate();

  function formatAMPM(date) {
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;
	  return strTime;
  }
  //organize time so it looks nice
  var time = month + '/' + day + '/' + year + " at " + formatAMPM(date);
  return time
}

exports.index = function(req, res){
  post.find({}).sort('-_id').execFind(function(err, posts){
        res.render('index', { title: title, posts:posts, admin: admin_check(req.session.admin)});
  });
};

exports.about = function(req, res){
  res.render('about', { title: title, admin: admin_check(req.session.admin) });
};

exports.contact = function(req, res){
  res.render('contact', { title: title, admin: admin_check(req.session.admin) });
};

exports.admin = function(req, res){
  if (admin_check(req.session.admin) == true){
	  res.redirect('/home')
  }	else {
  	res.render('admin', {error:error})
  }
};

exports.admin_post = function(req, res){
  var password1 = req.body.password;
  var password2 = req.body.passwordconfirm;
  if (password1 == password){
    if(password1 == password2){
      req.session.admin = 'true';
      res.redirect('/admin/new')
    }else{
      error = 'Passwords do not match';
      console.log(error)
      res.redirect('/admin')
    }
  }else{
    error = 'Wrong Password';
    console.log(error)
    res.redirect('/admin');
  }
};

exports.admin_new = function(req, res){
  if (admin_check(req.session.admin) == false) res.redirect('/home')
  post.find({}).sort('-_id').execFind(function(err, posts){
    if(posts){
      res.render('admin_new', { title: title, posts:posts, admin:admin_check(req.session.admin)});
    }else{
      res.render('admin_new', { title: title, posts:null, admin:admin_check(req.session.admin)})
    }
  }); 
};

exports.admin_new_post = function(req, res){
  if (admin_check(req.session.admin) == false){
  	res.end()
  }
  time = formatTime()
  var title = req.body.title;
  var body = req.body.body;
  
  //Submit to database
  var newPost = post({
    title: title,
    content: body,
    date: time
  });
  newPost.save();

  //redirecting to homepage
  res.redirect('/home');
};

exports.admin_edit = function(req, res){
  if (admin_check(req.session.admin) == false) res.redirect('/home')
  post.findOne({_id: req.params.id}, function(err, posts){
    if(posts){
      res.render('admin_edit', {title: title, Posts:posts, admin:admin_check(req.session.admin)})
    }else{
      res.redirect('/home')
    }
  })
};

exports.admin_edit_post = function(req, res){
  if (admin_check(req.session.admin) == false){
  	res.end()
  }

  body = req.body.body;
  title = req.body.title;

  post.findOne({title: title}, function(err, post){
    post.content = body;
    post.save()
    res.redirect('/home')
  })
};

exports.admin_delete = function(req, res){
  if (admin_check(req.session.admin) == false) res.redirect('/home')
  post.find({}).sort('-_id').execFind(function(err, posts){
    if(posts){
      res.render('admin_delete', { title: title, posts:posts, admin:admin_check(req.session.admin)});
    }else{
      res.render('admin_delete', { title: title, posts:null, admin:admin_check(req.session.admin)})
    }
  });
};

exports.admin_delete_post = function(req, res){
  if (admin_check(req.session.admin) == false){
  	res.end()
  }
  var title = req.body.title;
  var time = req.body.time;
  post.findOne({"title": title , "date":time}, function(err, match){
    if(match){
      match.remove()
      res.redirect('/admin/delete')
    }else{
      res.redirect('/home')
    }
  });
};

exports.post_view = function(req, res){
  id = req.params.id;
  post.find({'_id': id}, function(err, posts){
    if(posts){
      comments.find({'postid': id}, function(err, comment){
        if(comment){
          res.render('post_view', {title:title, posts:posts, comment:comment, admin:admin_check(req.session.admin)})
        }else{
          res.render('post_view', {title:title, posts:posts, comment:null, admin:admin_check(req.session.admin)})
        }
      });
    }else{
      res.redirect('/home')
    }
  });
};

exports.post_view_post = function(req, res){
  id = req.params.id;
  title_sub = req.params.title;
  name = req.body.name || 'anon';
  comment = req.body.comment || '<nothing>';
  time = formatTime()

  //Submit to database
  var newComment = comments({
    postid: id,
    title_sub: title_sub,
    name: name,
    comment: comment,
    date: time
  });

  newComment.save();

  res.redirect('/home/' + id);
};