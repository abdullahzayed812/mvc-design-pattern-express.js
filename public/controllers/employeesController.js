const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (request, response) => {
  response.json(data.employees);
};

const createNewEmployee = (request, response) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
  };

  if (!newEmployee.firstName || !newEmployee.lastName) {
    return response
      .status(400)
      .json({ message: "First name and last name is required" });
  }

  data.setEmployees([...data.employees, newEmployee]);
  response.status(201).json(data.employees);
};

const updateEmployee = (request, response) => {
  const employee = data.employees.find(
    (employee) => employee.id === parseInt(request.body.id)
  );
  if (!employee) {
    return response
      .status(400)
      .json({ message: `Employee ID ${request.body.id} not found` });
  }
  if (request.body.firstName) employee.firstName = request.body.firstName;
  if (request.body.lastName) employee.lastName = request.body.lastName;
  const filteredArray = data.employees.filter(
    (employee) => employee.id !== parseInt(request.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  response.json(data.employees);
};

const deleteEmployee = (request, response) => {
  const employee = data.employees.find(
    (employee) => employee.id === parseInt(request.body.id)
  );
  if (!employee) {
    response
      .status(400)
      .json({ message: `Employee ID ${request.body.id} not found` });
  }
  const filteredArray = data.employees.filter(
    (employee) => employee.id !== parseInt(request.body.id)
  );
  data.setEmployees(filteredArray);
  response.json(data.employees);
};

const getEmployee = (request, response) => {
  const employee = data.employees.find(
    (employee) => employee.id === parseInt(request.body.id)
  );
  if (!employee) {
    response
      .status(400)
      .json({ message: `Employee ID ${request.body.id} not found` });
  }
  response.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
