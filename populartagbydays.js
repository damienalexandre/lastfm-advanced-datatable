
var request_instance = y.rest("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks");


response.object = request_instance
.query('name', values['user']).query('api_key', values['api_key'])
.query('limit', values['limit'])
.get().response;
