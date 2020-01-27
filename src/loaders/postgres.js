var pg = require('pg');
var conString = "postgres://postgres:123456@localhost:5000/medFinder";

var db = new pg.Client(conString);
db.connect();

db.query(`"SELECT * FROM *`)

console.log('ddddddddddddd')