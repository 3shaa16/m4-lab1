"use strict";

// STORAGE KEY
const STORAGE_KEY = "employees";

// CREATE AN ARRAY OF EMPLOYEES (at least 5)
let employees = [
  [12345678, "Sally Smith", 1234, "sally.smith@abc.com", "Administrative"],
  [87654321, "Bob Jones", 4321, "bob.jones@abc.com", "Engineering"],
  [11223344, "Maria Garcia", 3344, "maria.garcia@abc.com", "Marketing"],
  [55667788, "Ava Johnson", 7788, "ava.johnson@abc.com", "Sales"],
  [99887766, "Liam Brown", 7766, "liam.brown@abc.com", "Quality Assurance"],
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
const storedEmployees = localStorage.getItem(STORAGE_KEY);
if (storedEmployees) {
  employees = JSON.parse(storedEmployees);
}

// GET DOM ELEMENTS
const form = document.querySelector("#addForm");
const empTable = document.querySelector("#empTable");
const empCount = document.querySelector("#empCount");

const id = document.querySelector("#id");
const name = document.querySelector("#name");
const extension = document.querySelector("#extension");
const email = document.querySelector("#email");
const department = document.querySelector("#department");

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();

// ADD EMPLOYEE
form.addEventListener("submit", (e) => {
  // PREVENT FORM SUBMISSION
  e.preventDefault();

  // GET THE VALUES FROM THE TEXT BOXES
  const empId = Number(id.value);
  const empName = name.value.trim();
  const empExt = Number(extension.value);
  const empEmail = email.value.trim();
  const empDept = department.value;

  // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
  const newEmployee = [empId, empName, empExt, empEmail, empDept];

  // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
  employees.push(newEmployee);

  // BUILD THE GRID
  buildGrid();

  // RESET THE FORM
  form.reset();

  // SET FOCUS BACK TO THE ID TEXT BOX
  id.focus();
});

// DELETE EMPLOYEE
empTable.addEventListener("click", (e) => {
  // Only react if the delete button was clicked
  if (!e.target.classList.contains("delete")) return;

  // CONFIRM THE DELETE
  if (confirm("Are you sure you want to delete this employee?")) {
    // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
    const rowIndex = e.target.parentNode.parentNode.rowIndex; // includes header row

    // REMOVE EMPLOYEE FROM ARRAY (subtract 1 because header row is index 0)
    employees.splice(rowIndex - 1, 1);

    // BUILD THE GRID
    buildGrid();
  }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
  // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
  const oldTbody = empTable.getElementsByTagName("tbody")[0];
  oldTbody.remove();

  // REBUILD THE TBODY FROM SCRATCH
  const tbody = document.createElement("tbody");

  // LOOP THROUGH THE ARRAY OF EMPLOYEES
  // REBUILDING THE ROW STRUCTURE
  for (const emp of employees) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${emp[0]}</td>
      <td>${emp[1]}</td>
      <td>${emp[2]}</td>
      <td>${emp[3]}</td>
      <td>${emp[4]}</td>
      <td><button class="btn btn-danger btn-sm delete">X</button></td>
    `;

    tbody.appendChild(tr);
  }

  // BIND THE TBODY TO THE EMPLOYEE TABLE
  empTable.appendChild(tbody);

  // UPDATE EMPLOYEE COUNT
  empCount.textContent = `(${employees.length})`;

  // STORE THE ARRAY IN STORAGE
  localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
}