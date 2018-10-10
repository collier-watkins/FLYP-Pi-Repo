
var command;
var class_name;
//Class name in format of XXXX-###-### 
function gen_Create_Table(class_name) {
	
	/*
	CREATE TABLE IF NOT EXISTS class_name {
		stu_UIN INT(9) FOREIGN KEY REFERENCES Students(stu_UIN),
		login DATETIME	
	}
	*/
	
	command = "CREATE TABLE IF NOT EXISTS " + class_name + " { stu_UIN INT(9) FOREIGN KEY REFERENCES Students(stu_UIN), login DATETIME }";
	
}


/*

https://www.w3schools.com/nodejs/nodejs_mysql_select.asp

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});


*/