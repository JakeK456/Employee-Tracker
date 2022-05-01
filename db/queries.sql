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

