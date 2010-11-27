
var request_instance = y.rest("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks");


response.object = request_instance.get().response;
