USE employees;

INSERT INTO department (name)
VALUES 
    ("Automotive"),
    ("Electronics"),
    ("Housewares"),
    ("Sporting Goods"),
    ("Toys");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Auto Manager", 40000, 1),
    ("Auto Cashier", 30000, 1),
    ("Auto Floor", 20000, 1),
    ("Elec Manager", 40000, 2),
    ("Elec Cashier", 30000, 2),
    ("Elec Floor", 20000, 2),
    ("House Manager", 40000, 3),
    ("House Floor", 20000, 3),
    ("Sport Manager", 40000, 4),
    ("Sport Floor", 20000, 4),
    ("Toys Manager", 40000, 5),
    ("Toys Floor", 20000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ("Jane", "Doe", 1),
    ("John", "Doe", 2),
    ("Jeff", "Doe", 3),
    ("Jane", "Smith", 4),
    ("John", "Smith", 5),
    ("Jeff", "Smith", 6),
    ("Jane", "Noname", 7),
    ("John", "Noname", 8),
    ("Jane", "Filler", 9),
    ("John", "Filler", 10),
    ("Jane", "Boring", 11),
    ("John", "Boring", 12);

    

    