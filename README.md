LastFm Advanced Datatable
=========================

Tables
------

 * besttags_by_day_table.xml : Return the more listened tags by days
 * contributions are welcomes :-)

TODO
----

- Using the YQL Paging element
- Protect the API key (done by custom store atm)
- Try to estimate the max number of call to TAGS the script can do (avoid 30s maximum execution time YQL limit).

Links
-----

- Debug mode: http://developer.yahoo.com/yql/console/?q=show%20tables&env=store://SnkhHDjgzoJNF7IpD1S7Av&debug=true#h=SELECT%20*%20FROM%20besttags_by_day_table%20WHERE%20user%3D%22Mobman02%22%3B
- Online usage: http://damienalexandre.fr/lab

Updates
-------

- 10 July 2012: Add cache, remove the github dependency and reformat the code