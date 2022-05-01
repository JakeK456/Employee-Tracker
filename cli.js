// Import mysql2, inquirer, and console.table
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const EmployeeDB = require('./queryEmployeeDB')

const db = new EmployeeDB();

inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'userChoice',
            choices: [
                {
                    name: 'View All Employees',
                    value: db.viewEmployees
                },
                {
                    name: 'Add Employee',
                    value: db.addEmployee
                },
                {
                    name: 'Update Employee Role',
                    value: db.addEmployee
                },
                {
                    name: 'View All Roles',
                    value: db.addEmployee
                },
                {
                    name: 'Add Role',
                    value: db.addEmployee
                },
                {
                    name: 'View All Departments',
                    value: db.addEmployee
                },
                {
                    name: 'Add Department',
                    value: db.addEmployee
                },
                {
                    name: 'Quit',
                    value: quit
                }
            ]
        }
    ])
    .then((response) => {
        response.userChoice();
    });

    function quit(){
        console.log("Quit Function");
    }

// db.query('DELETE FROM course_names WHERE id = ?', 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
//   // Query database after the delete finishes
//   db.query('SELECT * FROM course_names', (err, results) => {
//     console.log(results);
//   });
// });