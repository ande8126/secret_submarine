const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy');


router.get('/', (req, res) => {
  // what is the value of req.user????
  console.log('req.user:', req.user );

  if( req.user.clearance_level > 10 ){
  pool
    .query(`SELECT * FROM "secret";`)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
  }
  else if ( req.user.clearance_level > 6 ) {
    pool.query(`SELECT * FROM "secret" WHERE secrecy_level > 6;`)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
  }
  else if ( req.user.clearance_level > 3 ) {
    pool.query(`SELECT * FROM "secret" WHERE secrecy_level > 3;`)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
    }    
    else{
    res.sendStatus( 503 );
  }
});

module.exports = router;
