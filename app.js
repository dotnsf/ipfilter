//. app.js

var cfenv = require( 'cfenv' );
var express = require( 'express' );
var settings = require( './settings' );
var IpFilter = require( './ip-filter' );

var app = express();
var appEnv = cfenv.getAppEnv();

//. http://expressjs.com/ja/api.html
app.set( 'trust proxy', settings.trust_proxy );

if( settings.PERMITTED_IPS && settings.PERMITTED_IPS.length ){
  var ipFilter = IpFilter( settings.PERMITTED_IPS );
  app.use( ipFilter.filter );
}

app.get( '/', function( req, res ){
  res.contentType( 'application/json' );
  res.write( JSON.stringify( { message: 'Hello.' }, 2, null ) );
  res.end();
});

var port = appEnv.port || 3000;
app.listen( port );
console.log( 'server started on ' + port );
