// Import mysql2, inquirer, and console.table
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'pidayyum',
      database: 'employees_db'
    }
);

//getDepartments().then( ([rows, fields])  => console.log(Array.from(rows, obj => obj.name)));

const promptMain = () => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'userChoice',
                choices: [
                    {
                        name: 'View All Employees',
                        value: viewAllEmployees
                    },
                    {
                        name: 'Add Employee',
                        value: addEmployee
                    },
                    {
                        name: 'Update Employee Role',
                        value: updateEmployeeRole
                    },
                    {
                        name: 'View All Roles',
                        value: viewAllRoles
                    },
                    {
                        name: 'Add Role',
                        value: promptAddRole
                    },
                    {
                        name: 'View All Departments',
                        value: viewAllDepartments
                    },
                    {
                        name: 'Add Department',
                        value: promptAddDepartment
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
}

const viewAllEmployees = () => {
    db.promise().query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(e.first_name, ' ', e.last_name) AS manager
        FROM department
        JOIN role ON role.department_id = department.id
        JOIN employee ON employee.role_id = role.id
        LEFT JOIN employee e ON e.id = employee.manager_id`)
    .then( ([rows,fields]) => console.table(rows))
    .catch(err => { console.log(err) })
    .then( () => {
        promptMain()
    });
}

    function addEmployee() {
        console.log("addEmployee Function");
    }

    function updateEmployeeRole() {
        console.log("updateEmployeeRole Function");
    }
 
const viewAllRoles = () => {
    db.promise().query(
        `SELECT role.id, role.title, department.name AS department, role.salary
        FROM department
        JOIN role ON role.department_id = department.id`)
    .then( ([rows,fields]) => console.table(rows))
    .catch(err => { console.log(err) })
    .then( () => {
        promptMain()
    });
}

const addRole = (name, salary, department) => {
    console.log(`Name ${name}. Salary ${salary}. Dept ${department}`);
}

const promptAddRole = () => {
    db.promise().query(`SELECT id AS value, name FROM department`)
        .then( ([rows,fields]) => {
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the name of the role?',
                    name: 'name'
                },
                {
                    type: 'input',
                    message: 'What is the salary of the role?',
                    name: 'salary'
                },
                {
                    type: 'list',
                    message: 'Which department does the role belong to?',
                    name: 'department',
                    choices: rows
                }
            ])
            .then( (response) => addRole(response.name, response.salary, response.department) )
        })
        .catch(err => { console.log(err) });
};

const viewAllDepartments = () => {
    db.promise().query(`SELECT * FROM department`)
        .then( ([rows,fields]) => console.table(rows))
        .catch(err => { console.log(err) })
        .then( () => {
            promptMain()
        });
}

const addDepartment = (name) => {
    db.promise().query(
        `INSERT INTO department (name)
        VALUES ("${name}")`)
        .then( () => console.log(`Added ${name} to the database`))
        .catch(err => { console.log(err) })
        .then( () => {
            promptMain();
        });
};

const promptAddDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'name'
        }
    ])
    .then( (response) => addDepartment(response.name))
    .catch(err => { console.log(err) });
};

const quit = () => {
    console.log("Goodbye!");
    db.end();
}

promptMain();