//. ip-filter.js

const IpFilter = function( permittedIps ){
  const compareIp = function( remoteIp, permittedIp ){
    const pos = permittedIp.indexOf( '*' );
    if( pos === 0 ){
      return true;
    }else if( pos >= 0 ){
      return remoteIp.startsWith( permittedIp.substring( 0, pos ) );
    }else{
      return remoteIp === permittedIp;
    }
  };

  const isPermitted = function( ip ){
    const permitted = permittedIps.some( function( permittedIp ){
      return compareIp( ip, permittedIp );
    });

    return permitted;
  };

  const filter = function( req, res, next ){
    const ip = req.ip || req.connection.remoteAddress;
    console.log( 'req.ip=' + req.ip );
    console.log( 'req.connection.remoteAddress=' + req.connection.remoteAddress );

    if( isPermitted( ip ) ){
      next();
    }else{
      res.status( 403 ).send( 'Client IP(' + ip + ') is not permitted' );
    }
  };

  return{
    isPermitted,
    filter
  };
};

module.exports = IpFilter;
