const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig); // Recreate the connection, since the old one cannot be reused.  
  connection.connect(function onConnect(err) {   // The server is either down
    if (err) {                                   // or restarting (takes a while sometimes).
      console.log("Error connecting to db soma:", err);
      setTimeout(handleDisconnect, 10000);       // We introduce a delay before attempting to reconnect,
    }
    else {
      console.log("Successfully connected to db soma");    
    }                                            // to avoid a hot loop, and to allow our node script to
  });                                            // process asynchronous requests in the meantime.                                                 
  connection.on("error", function onError(err) { // If you're also serving http, display a 503 error.
    console.log("db error", err);
    if (err.code == "PROTOCOL_CONNECTION_LOST") {// Connection to the MySQL server is usually                                                 
      handleDisconnect();                        // lost due to either server restart, or a
    } else {                                     // connnection idle timeout (the wait_timeout                                                 
      throw err;                                 // server variable configures this)
    }
  });
}

handleDisconnect();

module.exports = { connection };
