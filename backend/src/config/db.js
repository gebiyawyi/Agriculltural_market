const Database = require("better-sqlite3");
const path = require("path");
require("dotenv").config();
const dbPath = path.resolve(
  __dirname,
  "../../",
  process.env.DB_PATH || "./database/agriculture.db",
);
const db = new Database(dbPath, { fileMustExist: true });
db.pragma("journal_mode = WAL");
console.log("SQLite connected:", dbPath);
module.exports = db;
