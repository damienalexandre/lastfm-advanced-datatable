//
//   var request_instance = y.rest("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks");
//
//response.object = request_instance
//.query('user', inputs['user']).query('api_key', inputs['api_key'])
//.query('limit', inputs['limit']).accept('application/json').get().response;


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
      "uts": "1291123559",
      "content": "30 Nov 2010, 14:26"
     }
    }]
}
};


var days_array = new Object();

//var ws_toptags = y.rest("http://ws.audioscrobbler.com/2.0/?method=track.gettoptags");
//y.query('');

// For each song
for (var x in recenttracks.results.track)
{
  y.log(recenttracks.results.track[x].name);
  y.log(recenttracks.results.track[x].artist.content);
  y.log(recenttracks.results.track[x].date.uts);

  var dayDate = new Date();
  dayDate.setTime( recenttracks.results.track[x].date.uts * 1000 );
  dayDate = dayDate.getDate() + '/' + (dayDate.getMonth()+1) + '/' + dayDate.getFullYear();

  y.log(dayDate);

  if (days_array[dayDate] == undefined)
  {
    days_array[dayDate] = new Object();
  }

  y.log('Call gettoptags for '+recenttracks.results.track[x].artist.content+ ' - '+recenttracks.results.track[x].name);

  var yql = 'SELECT * FROM lastfm.track.gettoptags WHERE api_key="'+inputs['api_key']+'" and track="'+recenttracks.results.track[x].name+'" and artist="'+recenttracks.results.track[x].artist.content+'"';
  y.log(yql);

  var toptags = y.query(yql);

  y.log(toptags.status);
  y.log(toptags.results.lfm.toptags.tag[0].name);

  for (var i in toptags.results.lfm.toptags.tag)
  {
    tag = toptags.results.lfm.toptags.tag[i];

    y.log(tag.name);
    
    if (days_array[dayDate][tag.name] != undefined)
    {
      days_array[dayDate][tag.name] = (parseInt(days_array[dayDate][tag.name],10) + parseInt(tag.count, 10));
    }
    else
    {
      days_array[dayDate][tag.name] = parseInt(tag.count,10);
    }
  }

  //days_array[dayDate][ days_array[dayDate].length ] = y.xmlToJson(toptags.results);

  y.log('End call');
  
}


// Order the tags by popularity
for (var d in days_array)
{
  var sortable = [];
  for (var tagname in days_array[d])
  {
    sortable.push([tagname, days_array[d][tagname]])
  }
  sortable.sort(function(a, b) {return a[1] - b[1]});

  days_array[d] = {
    0: {"name": sortable[0][0], "count": sortable[0][1]},
    1: {"name": sortable[1][0], "count": sortable[0][1]},
    2: {"name": sortable[2][0], "count": sortable[0][1]}
  };
}

response.object = days_array;