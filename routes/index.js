var express = require('express');
var app = express();
var client = require('../lib/rest');
var navigation = require('../snippets/navigation');

/* Get home page. */
app.get('/', function(req, res) {
	res.render('index', { navigation: navigation.Get(req), title: 'Home' });
});

/* Get blog posts page. */
app.get('/posts', function(req, res) {
	client.Init(req, function(auth) {
		client.Get('/v1/sites/90/posts/blog-post', {}, function(data) {
			res.render('posts', { navigation: navigation.Get(req), title: 'Blog', posts: data });
		});
	});
});

/* Get single post page. */
app.get('/posts/post/:id', function(req, res) {
	client.Init(req, function(auth) {
		client.Get('/v1/sites/90/posts/blog-post/'+req.params.id, {}, function(data) {
			res.render('post', { navigation: navigation.Get(req), title: 'Blog', post: data });
		});
	});
});

module.exports = app;