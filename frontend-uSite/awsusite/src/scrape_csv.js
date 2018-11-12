/*
LOAD DATA LOCAL INFILE '&&path to file&&'
INTO TABLE &&table_name&&
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(@discard1,@discard2,@discard3,uin,@discard4,@discard5,@discard6,@discard7,@discard8,@discard9,@discard10,@discard11,@discard12,@discard13,@discard14,@discard15)

&&path_to_file is the literal path in the directory. It must be enclosed by the single apostrophe ('). Ex: 'C:/User/howdy.csv'
&&table_name&& is the name in the SQL database. Ex: CSCE-121-500

*/

//filename needs to be the string denoting the path to the csv file.
var filename;
var tablename;

function scrape_csv_js(var command_scrape_csv) {
	
	//double backslash for newline char found here
	command_scrape_csv = "LOAD DATA LOCAL INFILE \'" ++ filename ++ "\' INTO TABLE " ++ tablename ++ " FIELDS TERMINATED BY \',\' LINES TERMINATED BY \'\\n\' IGNORE 1 LINES (@discard1,@discard2,@discard3,uin,@discard4,@discard5,@discard6,@discard7,@discard8,@discard9,@discard10,@discard11,@discard12,@discard13,@discard14,@discard15)";
	
}