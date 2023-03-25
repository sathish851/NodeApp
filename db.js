const {user,host,database,password,port} = require('pg/lib/defaults');

const Pool  = require('pg').Pool;
var fs = require('fs');

const pool = new Pool({
    user:"postgres",
    host:"database-2.cb2iwtkrwlhi.ap-south-1.rds.amazonaws.com",
    database:"demo",
    password:"SRSEETHA",
    port:5432,
    ssl  : {
        ca : fs.readFileSync('./ap-south-1-bundle.pem')
    }
});

module.exports = pool;