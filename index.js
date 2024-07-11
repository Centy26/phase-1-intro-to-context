function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    console.log(`Time In Event added: `, employee.timeInEvents);
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTime) {
    let [date, hour] = dateTime.split(' ');
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    console.log(`Time Out Event added: `, employee.timeOutEvents);
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);
    console.log(`Found Time In:`, timeIn);
    console.log(`Found Time Out:`, timeOut);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    console.log(`Hours Worked: ${hoursWorked}`);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(event => event.date);
    let payable = dates.reduce((memo, date) => memo + wagesEarnedOnDate(employee, date), 0);
    return payable;
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  
  
  let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1]);
  console.log(`Employee Record: `, testEmployee); 
  testEmployee = createTimeInEvent(testEmployee, "2022-09-01 0900");
  testEmployee = createTimeOutEvent(testEmployee, "2022-09-01 1700");
  console.log(`Employee Record with Events: `, testEmployee);
  let  hoursWorked = hoursWorkedOnDate(testEmployee, "2022-09-01");
  console.log(`Hours Worked on 2022-09-01: ${hoursWorked}`); 
  
  let wages = wagesEarnedOnDate(testEmployee, "2022-09-01");
  console.log(`Wages Earned on 2022-09-01: ${wages}`); 
  



