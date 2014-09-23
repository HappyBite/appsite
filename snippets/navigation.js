module.exports = function() {
	var get = function(req) {
		var navigation = [
		{
			name: 'Home',
			url: '/'			
		},
		{
			name: 'Blog',
			url: '/posts'			
		}
		];
		for(var i = 0; i < navigation.length; i++) {
			var url = navigation[i].url;
			var currentUrl = req.url;
			if(currentUrl == '/' && url == '/') {
				navigation[i].active = true;
			} else if (currentUrl.indexOf(url) === 0 && url != '/') {
				navigation[i].active = true;
			}
		}
		return navigation;
	};
	
	// Public interface
	return {
		// Public variables

		// Public methods
		//Login: login,
		Get: get,
	};
} ();

