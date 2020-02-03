var pg = require('pg');
import config from "../config";

const db = new pg.Client(config.databaseURL);
db.connect();


export default db