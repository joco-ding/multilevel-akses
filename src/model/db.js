import mysql from 'mysql2'
import { DBHOST, DBNAME, DBUSER, DBPASS, DBPORT } from '../config.js'


const pool = mysql.createPool({
  host: DBHOST,
  port: DBPORT,
  database: DBNAME,
  user: DBUSER,
  password: DBPASS
})

export default pool.promise()
