//. app.js

var express = require( 'express' );
var settings = require( './settings' );
var IpFilter = require( './ip-filter' );

var app = express();

if( settings.PERMITTED_IPS && settings.PERMITTED_IPS.length ){
  var ipFilter = IpFilter( settings.PERMITTED_IPS );
  app.use( ipFilter.filter );
}

app.get( '/', function( req, res ){
  res.contentType( 'application/json' );
  res.write( JSON.stringify( { message: 'Hello.' }, 2, null ) );
  res.end();
});

var port = 3000;
app.listen( port );
console.log( 'server started on ' + port );
