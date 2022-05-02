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

const promptMain = () => {
    inquirer.prompt([
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
                value: promptAddEmployee
            },
            {
                name: 'Update Employee Role',
                value: promptUpdateEmployeeRole
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
    })
    .catch(err => { console.log(err) });
}

const viewAllEmployees = () => {
    db.promise().query(
        `SELECT employee.id, employee.first_name, employee.last_name, 
            role.title, department.name AS department, role.salary, 
            CONCAT(e.first_name, ' ', e.last_name) AS manager
        FROM department
        JOIN role ON role.department_id = department.id
        JOIN employee ON employee.role_id = role.id
        LEFT JOIN employee e ON e.id = employee.manager_id
        ORDER BY employee.id ASC`)
    .then( ([rows,fields]) => {
        console.table(rows);
        promptMain();
    })
    .catch(err => { console.log(err) })
}

const addEmployee = (firstName, lastName, roleId, managerId) => {
    db.promise().query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId})`)
    .then( () => {
        console.log(`Added ${firstName} ${lastName} to the database`);
        promptMain();
    })
    .catch(err => { console.log(err) })
}

const promptAddEmployee = () => {
    let firstName = null;
    let lastName = null;
    let roleArr = null;
    let roleId = null;
    let managerArr = null;
    let managerId = null;

    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee\'s first name?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the employee\'s last name?',
            name: 'lastName'
        }
    ])
    .then((response) => {
        firstName = response.firstName;
        lastName = response.lastName;

        return db.promise().query(
            `SELECT id AS value, title AS name
            FROM role`);
    })
    .then(([rows,fields]) => {
        roleArr = rows;
        return inquirer.prompt([
            {
                type: 'list',
                message: 'What is the employee\'s role?',
                name: 'role',
                choices: roleArr
            }
        ]);
    })
    .then((response) => {
        roleId = response.role;

        return db.promise().query(
            `SELECT employee.id AS value, CONCAT(employee.first_name, ' ', employee.last_name) AS name
            FROM employee`);
    })
    .then(([rows,fields]) => {
        managerArr = rows;
        managerArr.unshift({value: null, name: 'None'});

        return inquirer.prompt([
            {
                type: 'list',
                message: 'Who is the employees manager?',
                name: 'manager',
                choices: managerArr
            }
        ]);
    })
    .then((response) => {
        managerId = response.manager;
        addEmployee(firstName, lastName, roleId, managerId);
    })
    .catch(err => { console.log(err) });
};

const updateEmployeeRole = (employeeId, roleId) => {
    db.promise().query(
        `UPDATE employee
        SET role_id = ${roleId}
        WHERE id = ${employeeId}`)
    .then( () => {
        console.log(`Updated employee\'s role`);
        promptMain();
    })
    .catch(err => { console.log(err) })
}

const promptUpdateEmployeeRole = () => {
    let employeeId = null;
    let roleId = null;

    db.promise().query(
        `SELECT employee.id AS value, CONCAT(employee.first_name, ' ', employee.last_name) AS name
        FROM employee`)
    .then(  ([rows,fields]) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee\'s role do you want to update?',
                name: 'employeeId',
                choices: rows
            }
        ]);
    })
    .then( (response) => {
        employeeId = response.employeeId;
        return db.promise().query(
            `SELECT role.id AS value, role.title AS name
            FROM role`);
    })
    .then( ([rows,fields]) => {
        return inquirer.prompt([
            {
                type: 'list',
                message: 'Which role do you want to assign the selected employee?',
                name: 'roleId',
                choices: rows
            }
        ]);
    })
    .then( (response) => {
        roleId = response.roleId;
        updateEmployeeRole(employeeId, roleId);
    })
    .catch(err => { console.log(err) })
}
 
const viewAllRoles = () => {
    db.promise().query(
        `SELECT role.id, role.title, department.name AS department, role.salary
        FROM department
        JOIN role ON role.department_id = department.id`)
    .then( ([rows,fields]) => {
        console.table(rows);
        promptMain();
    })
    .catch(err => { console.log(err) });
}

const addRole = (name, salary, department) => {
    db.promise().query(
        `INSERT INTO role (title, salary, department_id)
        VALUES ("${name}", ${salary}, ${department})`)
    .then( () => {
        console.log(`Added ${name} to the database`);
        promptMain();
    })
    .catch(err => { console.log(err) });
}

const promptAddRole = () => {
    db.promise().query(`SELECT id AS value, name FROM department`)
    .then( ([rows,fields]) => {
        return inquirer.prompt([
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
    })
    .then( (response) => addRole(response.name, response.salary, response.department) )
    .catch(err => { console.log(err) });
};

const viewAllDepartments = () => {
    db.promise().query(`SELECT * FROM department`)
    .then( ([rows,fields]) => {
        console.table(rows);
        promptMain();
    })
    .catch(err => { console.log(err) });
}

const addDepartment = (name) => {
    db.promise().query(
        `INSERT INTO department (name)
        VALUES ("${name}")`)
    .then( () => {
        console.log(`Added ${name} to the database`);
        promptMain();
    })
    .catch(err => { console.log(err) });
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