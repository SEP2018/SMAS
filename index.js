require('dotenv').load();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var http = require('http');
var fs = require('fs');

var pass = process.env['ADMIN_PASS'];
// Create connection to database
var config = {
     userName: 'smasadmin',
     password: pass,
     server: 'smas.database.windows.net',
     options: {
           database: 'SMASDatabase'
           , encrypt: true
     }
}
var connection = new Connection(config);


// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) 
   {
     if (err) 
       {
          console.log(err)
       }
    else
       {
           queryDatabase()
       }
   }
 );

function queryDatabase()
   { 
   
   console.log('Reading rows from the Table...');

	   // Read all rows from table
	 request = new Request(
		  "SELECT * FROM staff",
			 function(err, rowCount, rows) 
				{
					console.log(rowCount + ' row(s) returned');
					process.exit();
				}
			);
			
	 request.on('row', function(columns) {
		columns.forEach(function(column) {
			console.log("%s\t%s", column.metadata.colName, column.value);
		 });
	 });
	 connection.execSql(request);
   }
   
//creates server on website
var server = http.createServer(function(request, response) {
	fs.readFile('index.html', function(err, data) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(data);
	});
});

var port = process.env.PORT || 1337;
server.listen(port, 'localhost');

console.log("Server running at http://localhost:%d", port);



