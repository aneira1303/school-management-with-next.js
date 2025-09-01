import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",    // usually stays localhost
  user: "root",         // your MySQL username
  password: "root", // the password you set during MySQL installation
  database: "schoolDB"
});
