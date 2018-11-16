// Functions to call API
//
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
 *  Example workflow:
 *
 *  1) addStudent("111001111", "Curtis", "Green", "card number here");
 *  2) addProfessor("222002222", "notCurtis", "notGreen", "card number here");
 *  3) addClass("CSCE_121_500", "222002222");
 *  4) addStudentToClass("CSCE_121_500", "111001111");
 *  5) addAttendanceDay("CSCE_121_500", "2018_11_14");
 *  6) let data = trackAttendance("111001111", "CSCE_121_500", "2018_11_14");
 *    data.num_attended, data.num_class_days
 *  7) let csv = getAttendance("CSCE_121_500");
 *    download csv
 *
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
//
// URLs: 
//
// localhost:3001/api/
// http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/
//
// Calls API
export function callApi(url = '', data = {}, type = '') {
  console.log(data);
  return fetch(url, {
                method: type,
                
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data)
	})
    .then(response => response.json())
    .catch(err => console.log(err));
}

///////////////////////////////////////////////////////
//          Functions for calling API
///////////////////////////////////////////////////////

export function testApi() {
  callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api', {test: "test"}, "POST")
      .then(data => console.log(data))
      .catch(error => console.error(error));
}

export function addClass(courseName, profUin) {
    callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/class', {course_name: courseName, uin: profUin}, "POST")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

export function addAttendanceDay(courseName, courseDate) {
    callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/class/' + courseName, {date: courseDate}, "PUT")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

export function addStudent(uin, firstName, lastName, cardNum) {
    callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/student', {uin: uin, first: firstName, last: lastName, card: cardNum}, "POST")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

export function addStudentToClass(courseName, uin) {
    callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/student', {course_name: courseName, uin: uin}, "PUT")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

export function addProfessor(uin, firstName, lastName, cardNum) {
    callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/professor', {uin: uin, first: firstName, last: lastName, card: cardNum}, "POST")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

/*
let trackAttendance = (studUin, courseName, date) => {
  return new Promise ((resolve, reject) => {
    callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/attendance', {uin: studUin, course_name: courseName, date: date}, "PUT")
      .then(data => {
        console.log(data);
        resolve(data);
      })
      .catch(error => console.error(error));
  });
}

let getAttendance = (courseName) => {
  return new Promise ((resolve, reject) => {
    callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/attendance', {course_name: courseName}, "GET")
      .then(data => {
        console.log(JSON.stringify(data));
        resolve(JSON.stringify(data));
      })
      .catch(error => console.error(error));
  })
}
*/
