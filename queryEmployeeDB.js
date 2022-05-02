// UNUSED!!!!!!!!!!!!!


const mysql = require('mysql2');
const consoleTable = require('console.table');

class EmployeeDB {
    constructor(){
        this.db = mysql.createConnection(
            {
              host: 'localhost',
              user: 'root',
              password: 'pidayyum',
              database: 'employees_db'
            }
        );
    }

    viewEmployees(){
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
        db.promise().query('SELECT * FROM department')
            .then( ([rows,fields]) => console.table(rows))
            .catch(err => { console.log(err) })
            .then( () => db.end());
    }

    addDepartment() {
        console.log("addDepartment Function");
    }
}

module.exports = EmployeeDB;
