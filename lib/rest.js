var querystring = require('querystring');
var http = require('http');
var host = 'api.hemsidaonline.se';
var port = '555';
var clientId = 'test';
var clientSecret = 'suryabhai';
var grantType = 'client_secret';
var requestTokenUri = '/oauth/get_request_code';
var accessTokenUri = '/oauth/token';
var _accessToken = null;
module.exports = function() {
	var init = function(req, func) {
		if(req.session.certificate) {
			console.log('Logged in');
			console.log(req.session.certificate.access_token);
			func(req.session.certificate);
		} else {
			module.exports.Get(requestTokenUri, {}, function(data) {
				console.log('Not logged in');
				console.log('Logging in');
				var requestToken = data.request_token;
				//Get access token
				module.exports.Get(accessTokenUri, { code: requestToken, client_id: clientId, client_secret: clientSecret, grant_type: grantType }, function(data) {
					//Save the new access token for future requests
					req.session.certificate = data;
					_accessToken = req.session.certificate.access_token;
					func(data);
				});
			});
		}
	},
	get = function(endPoint, data, func) {
		var method = 'GET';
		var headers = {};
		endPoint += '?' + querystring.stringify(data);
		headers = {
			'content-type': 'application/json',
			'Authorization': 'Bearer ' + _accessToken
		};
		var options = {
			host: host,
			port: port,
			path: endPoint,
			method: method,
			headers: headers
		};
		var req = http.request(options, function(res) {
			res.setEncoding('utf-8');
			var result = '';
			res.on('data', function(response) {
				result += response;
			});
			res.on('end', function() {
				if(typeof result === 'string') {
					try {
						result = JSON.parse(result);
						console.log('Response length: ' + JSON.stringify(result).length);
					} catch(err) {
						console.log(err.message);	
						console.log('Response length: ' + result.length);
					}
				}
				func(result);
			});
		})
		req.end();
	};

	// Public interface
	return {
		// Public variables

		// Public methods
		//Login: login,
		Init: init,
		Get: get
	};
} ();
























//	performRequest = function(endpoint, method, data, success) {
//		var dataString = JSON.stringify(data);
//		var headers = {};

//		if (method == 'GET') {
//			endpoint += '?' + querystring.stringify(data);
//		}
//		else {
//			headers = {
//				'Content-Type': 'application/json',
//				'Content-Length': dataString.length
//			};
//		}
//		var options = {
//			host: host,
//			port: port,
//			path: endpoint,
//			method: method,
//			headers: headers
//		};

//		var req = http.request(options, function(res) {
//			res.setEncoding('utf-8');

//			var responseString = '';

//			res.on('data', function(data) {
//				responseString += data;
//			});

//			res.on('end', function() {
//				//return responseString;
//				//site = responseString;
//				//console.log(responseString);
//				//var responseObject = JSON.parse(responseString);
//				success(responseString);
//			});
//		});

//		req.write(dataString);
//		req.end();
//	};



//console.log({"hehe": "hehe"});
//console.log(res.headers['content-type']);
//console.log(response);
//console.log(typeof response);
//console.log(JSON.parse(response));
//console.log(typeof JSON.parse(response));
//type(options.data)
//console.log(response);