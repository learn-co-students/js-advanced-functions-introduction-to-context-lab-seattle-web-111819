// Your code here
const createEmployeeRecord = record => {return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []
}}
const createEmployeeRecords = records => {
    let employees = []
    records.forEach(record => employees.push(createEmployeeRecord(record)))
    return employees
}
const createTimeInEvent = (record, date) => {
    record.timeInEvents.push({type: "TimeIn", date: date.slice(0,10), hour: parseInt(date.slice(-4))})
    return record
}
const createTimeOutEvent = (record, date) => {
    record.timeOutEvents.push({type: "TimeOut", date: date.slice(0,10), hour: parseInt(date.slice(-4))})
    return record
}
const hoursWorkedOnDate = (record, date) => {
    let inTime = record.timeInEvents.reduce((m, event) => event.date == date ? event.hour : m, 0)
    let outTime = record.timeOutEvents.reduce((m, event) => event.date == date ? event.hour : m, 0)
    return (outTime - inTime) / 100
}
const wagesEarnedOnDate = (record, date) => hoursWorkedOnDate(record, date) * record.payPerHour
const allWagesFor = record => record.timeInEvents.reduce((m, event) => m + wagesEarnedOnDate(record, event.date), 0)
const findEmployeeByFirstName = (employees, name) => employees.find(emp => emp.firstName == name)
const calculatePayroll = employees => employees.reduce((m, emp) => m + allWagesFor(emp), 0)