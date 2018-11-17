// Calls API
export function callApi(url = '', data = {}, type = '') {
	return fetch(url, {
    method: type,
		headers: { "Content-Type": "application/json; charset=utf-8" },
		body: JSON.stringify(data)
	})
	.then(response => response.json())
  .catch(err => console.error(err));
}

/* Example workflow:

  On AWS:

  *) let data = login(profUin);
    data.courses[0].course_id, data.courses[l].course_id, etc.
  *) addStudent("111001111", "Curtis", "Green");
  *) addProfessor("222002222", "notCurtis", "notGreen");
  *) addClass("CSCE_121_500", "222002222");
  *) addStudentToClass("CSCE_121_500", "111001111");
  *) let csv = getAttendance("CSCE_121_500");
    csv is a string in csv format
    download csv


  On the pi:

  *) let roster = getRoster("CSCE_121_500");
    roster[0].uin, roster[0].firstName, roster[0].lastName, roster[0].cardNum, 
    roster[0].rfidNum, roster[1].uin, etc.
  *) addAttendanceDay("CSCE_121_500", "2018_11_14");
  *) let data = trackAttendance("111001111", "CSCE_121_500", "2018_11_14");
      increases attendance for student and returns:
      data.num_attended, data.num_class_days

*/

///////////////////////////////////////////////////////
//          Functions for calling API
///////////////////////////////////////////////////////
export function testApi() {
    callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api', {test: "test"}, "PUT")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

export function login(uin) {
  callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/login/' + uin, {}, "GET")
    .then(data => {
      console.log(data);
      return data;
    })
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
    callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/student', {uin: uin, first: firstName, last: lastName}, "POST")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

export function addStudentToClass(courseName, uin) {
    callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/student', {course_name: courseName, uin: uin}, "PUT")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

export function addProfessor(uin, firstName, lastName, cardNum) {
    callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/professor', {uin: uin, first: firstName, last: lastName}, "POST")
      .then(data => console.log(data.message))
      .catch(error => console.error(error));
}

export function trackAttendance(studUin, courseName, date) {
  callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/attendance', {uin: studUin, course_name: courseName, date: date}, "PUT")
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => console.error(error));
}

let getAttendance = (courseName) => {
    callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/attendance' + courseName, {}, "GET")
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(error => console.error(error));
}

export function getRoster(courseName) {
    callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/roster' + courseName, {}, "GET")
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(error => console.error(error));
}

/*
let login = (uin) => {
  callApi('http://ec2-18-222-100-183.us-east-2.compute.amazonaws.com:3001/api/login/' + uin, {}, "GET")
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => console.error(error));
}
*/
