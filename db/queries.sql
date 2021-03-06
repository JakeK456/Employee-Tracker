-- View All Departments
SELECT * 
FROM department;

--View All Roles
SELECT role.id, role.title, department.name AS department, role.salary
FROM department
JOIN role ON role.department_id = department.id;

--View All Employees
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(e.first_name, ' ', e.last_name) AS manager
FROM department
JOIN role ON role.department_id = department.id
JOIN employee ON employee.role_id = role.id
LEFT JOIN employee e ON e.id = employee.manager_id;

-- Get Employees
SELECT employee.id AS value, CONCAT(employee.first_name, ' ', employee.last_name) AS name
FROM employee;

-- Get Managers
SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS manager 
FROM employee
INNER JOIN employee e ON e.id = employee.manager_id
GROUP BY employee.manager_id;

-- Add Department
INSERT INTO department (name)
VALUES ("Service");

-- Add Role
INSERT INTO role (title, salary, department_id)
VALUES ("Customer Service", 80000, 5);      -- Customer Service | 80000 | Service

-- Add Employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Kash", 9, 3);    -- Sam | Kash | Customer Service | Ashley Rodriguez

-- Update Employee Role
UPDATE employee
SET role_id = ##
WHERE id = ##;