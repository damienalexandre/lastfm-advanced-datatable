/**
 * This JS file is include by the XML table execute node.
 *
 * Call multiple times the TAG webservice.
 *
 * @todo
 *  - Try to estimate the max number of call to TAGS the script can do (avoid 30s maximum execution time YQL limit).
 *  - Cache TAG service responses to avoid calling twice the same song
 * @author dalexandre
 * @since  2010/12/27
 */

// Set some vars, check if limit is provided
inputs['limit'] = inputs['limit'] || 15;
var request_recenttracks = y.rest("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks");
y.env('store://tT9De0xTrCLjq9mXzlbTd3'); // TopTag security store
var recenttracks;
var days_list = new Object();

/**
 * Fetch the Top Tag of a song
 */
function getTopTags(name, artist)
{
  var yql = 'SELECT * FROM lastfm.track.gettoptags WHERE api_key="'+inputs['api_key']+'" and track="'+name+'" and artist="'+artist+'"';
  return y.query(yql);
}

// Call the last songs \o/
recenttracks = request_recenttracks
.query('user', inputs['user']).query('api_key', inputs['api_key'])
.query('limit', inputs['limit']).accept('application/json').get().response;
recenttracks = y.xmlToJson(recenttracks).lfm.recenttracks.track;

// For each song
for (var trackindex in recenttracks)
{
  y.log('At '+recenttracks[trackindex].date.uts+', user have listen '+recenttracks[trackindex].name+' by '+recenttracks[trackindex].artist.content);

  // Get a clean timestamp (only the DAY at midnight, without hours / minutes / seconds)
  var trackDate = new Date();
  trackDate.setTime( recenttracks[trackindex].date.uts * 1000 );
  var dayDate = new Date(""+trackDate.getFullYear()+"/"+trackDate.getMonth()+"/"+trackDate.getDate());
  dayDate = (dayDate.getTime()/1000);

  if (days_list[dayDate] == undefined)
  {
    days_list[dayDate] = new Object();
  }

  toptags = getTopTags(recenttracks[trackindex].name, recenttracks[trackindex].artist.content);

  for (var tagindex in toptags.results.lfm.toptags.tag)
  {
    var tag = toptags.results.lfm.toptags.tag[tagindex];

    if (days_list[dayDate][tag.name] != undefined)
    {
      days_list[dayDate][tag.name] = (parseInt(days_list[dayDate][tag.name],10) + parseInt(tag.count, 10));
    }
    else
    {
      days_list[dayDate][tag.name] = parseInt(tag.count,10);
    }
  }
}


// Order the tags by popularity and format in XML
var returnXml = <days></days>;

for (var day in days_list)
{
  var content = <day></day>;
  var sortable = [];

  for (var tagname in days_list[day])
  {
    // If the tag is more than 0 only
    if (days_list[day][tagname] > 0)
    {
      sortable.push([tagname, days_list[day][tagname]])
    }
  }
  sortable.sort(function(a, b) {
    return b[1] - a[1]
  });

  y.log("Day "+day+", best tag : "+sortable[0][0]+" with "+ sortable[0][1]);

  for (var index in sortable)
  {
    content.appendChild( <tag count={sortable[index][1]}>{sortable[index][0]}</tag> );
  }

  content.@uts = day;
  returnXml.appendChild( content );
}

// The response XML
response.object = returnXml;