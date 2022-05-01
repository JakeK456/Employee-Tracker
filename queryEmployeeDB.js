const mysql = require('mysql2');

class EmployeeDB {
    constructor(password, dbName){
        this.db = mysql.createConnection(
            {
              host: 'localhost',
              user: 'root',
              password: 'pidayyum',
              database: 'employees_db'
            }
        );
    }

    viewEmployes(){
        console.log("viewEmployes Function");
    }

    addEmployee() {
        console.log("addEmployee Function");
    }

    updateEmployeeRole() {
        console.log("updateEmployeeRole Function");
    }

    viewAllRoles(){
        console.log("viewAllRoles Function");
    }

    addRole() {
        console.log("addRole Function");
    }

    viewAllDepartments() {
        console.log("viewAllDepartments Function");
    }

    addDepartment() {
        console.log("addDepartment Function");
    }
}

module.exports = EmployeeDB;
