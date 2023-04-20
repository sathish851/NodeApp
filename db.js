const {user,host,database,password,port} = require('pg/lib/defaults');

const Pool  = require('pg').Pool;
var fs = require('fs');

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    database:"project",
    password:"pass",
    port:5432,
    /*ssl  : {
        ca : fs.readFileSync('./ap-south-1-bundle.pem')
    }*/
});

module.exports = pool;