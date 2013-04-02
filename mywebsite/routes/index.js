
title = 'My Pagen'

exports.index = function(req, res){
  res.render('index', { title: title });
};
exports.about = function(req, res){
  res.render('about', { title: title });
};
exports.contact = function(req, res){
  res.render('contact', { title: title });
};