//
//   var request_instance = y.rest("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks");
//
//response.object = request_instance
//.query('user', inputs['user']).query('api_key', inputs['api_key'])
//.query('limit', inputs['limit']).get().response;


var recenttracks = {"results": {
   "track": [
    {
     "artist": {
      "mbid": "7b885d42-3c41-4f43-9944-a5855ec5155e",
      "content": "Goldfrapp"
     },
     "name": "Deer Stop",
     "streamable": "0",
     "mbid": null,
     "album": {
      "mbid": "3e3318f4-4f65-441d-b4d6-b8cbd2d97368",
      "content": "Felt Mountain"
     },
     "url": "http://www.last.fm/music/Goldfrapp/_/Deer+Stop",
     "image": [
      {
       "size": "small",
       "content": "http://userserve-ak.last.fm/serve/34s/54957407.png"
      },
      {
       "size": "medium",
       "content": "http://userserve-ak.last.fm/serve/64s/54957407.png"
      },
      {
       "size": "large",
       "content": "http://userserve-ak.last.fm/serve/126/54957407.png"
      },
      {
       "size": "extralarge",
       "content": "http://userserve-ak.last.fm/serve/300x300/54957407.png"
      }
     ],
     "date": {
      "uts": "1290770830",
      "content": "26 Nov 2010, 11:27"
     }
    },
    {
     "artist": {
      "mbid": "10adbe5e-a2c0-4bf3-8249-2b4cbf6e6ca8",
      "content": "Massive Attack"
     },
     "name": "Babel",
     "streamable": "0",
     "mbid": null,
     "album": {
      "mbid": "",
      "content": "Heligoland"
     },
     "url": "http://www.last.fm/music/Massive+Attack/_/Babel",
     "image": [
      {
       "size": "small",
       "content": "http://userserve-ak.last.fm/serve/34s/54751885.png"
      },
      {
       "size": "medium",
       "content": "http://userserve-ak.last.fm/serve/64s/54751885.png"
      },
      {
       "size": "large",
       "content": "http://userserve-ak.last.fm/serve/126/54751885.png"
      },
      {
       "size": "extralarge",
       "content": "http://userserve-ak.last.fm/serve/300x300/54751885.png"
      }
     ],
     "date": {
      "uts": "1290770510",
      "content": "26 Nov 2010, 11:21"
     }
    }]
}
};

for (x in recenttracks.results.track)
{
  y.log(recenttracks.results.track[x].name);
}