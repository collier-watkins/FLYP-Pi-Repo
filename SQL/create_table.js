//2 tables need to generate - one for roster and one for tracking attendance

var command_roster;
var command_atte;
var class_name;
//Class name in format of XXXX-###-### 
function gen_Create_Table(class_name) {
	
	/*
	CREATE TABLE IF NOT EXISTS class_name {
		stu_UIN INT(9) FOREIGN KEY REFERENCES Students(stu_UIN),
		login DATETIME	
	}
	*/
	
	var class_name_roster = class_name + "_roster";
	var class_name_atte = class_name + "_atte";
	
	command_roster = "CREATE TABLE IF NOT EXISTS " + class_name_roster + " { stu_UIN INT(9) FOREIGN KEY REFERENCES Students(stu_UIN) }";
	command_atte = "CREATE TABLE IF NOT EXISTS " + class_name_atte + " { stu_UIN INT(9) FOREIGN KEY REFERENCES Students(stu_UIN), login DATETIME }";
	
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
