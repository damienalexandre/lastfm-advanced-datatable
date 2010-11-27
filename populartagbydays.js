
   var request_instance = y.rest("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks");

response.object = request_instance
.query('user', inputs['user']).query('api_key', inputs['api_key'])
.query('limit', inputs['limit']).get().response;
