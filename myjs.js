// // DOM Elements
// const expenseForm = document.getElementById('expenseForm');
// const expenseList = document.getElementById('expenses');
// const expenseChart = document.getElementById('expenseChart');
// const toggleThemeButton = document.getElementById('toggleTheme');
// const submitButton = document.querySelector('.btn');
// const totalExpenseOverlay = document.createElement('div'); // Create overlay for total expenses
// totalExpenseOverlay.id = 'totalExpenseOverlay';
// document.querySelector('.analytics').appendChild(totalExpenseOverlay); // Append it to the analytics section
// let editingExpense = null;

// // Data store for expenses
// let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// // Event: Add or Update expense
// expenseForm.addEventListener('submit', function (e) {
//     e.preventDefault();

//     // Get form values
//     const name = document.getElementById('expenseName').value;
//     const amount = document.getElementById('expenseAmount').value;
//     const category = document.getElementById('expenseCategory').value;
//     const date = document.getElementById('expenseDate').value; // Get date input

//     if (!name || !amount || !category || !date) return;

//     // Check if editing
//     if (editingExpense !== null) {
//         expenses[editingExpense] = { name, amount, category, date }; // Include date in update
//         editingExpense = null;

//         // Change button back to "Add Expense"
//         submitButton.textContent = 'Add Expense';
//         submitButton.style.backgroundColor = '#007bff'; // Reset to blue
//     } else {
//         // Add new expense to array
//         expenses.push({ name, amount, category, date });
//     }

//     // Save to localStorage
//     localStorage.setItem('expenses', JSON.stringify(expenses));

//     // Reset form and update UI
//     expenseForm.reset();
//     renderExpenses();
//     updateChart();
//     displayFilteredExpenses(''); // Refresh displayed expenses after adding new entry
// });

// // Function to get today's date
// function getToday() {
//     return new Date();
// }

// // Function to get the start of the week (7 days including today)
// function getStartOfWeek() {
//     const today = getToday();
//     const startOfWeek = new Date(today);
//     startOfWeek.setDate(today.getDate() - 6); // Get the date 6 days ago
//     return startOfWeek;
// }

// // Function to filter expenses by time period
// function filterExpenses(timePeriod) {
//     let filteredExpenses = [];
//     const today = getToday();

//     switch (timePeriod) {
//         case 'today':
//             filteredExpenses = expenses.filter(expense => {
//                 const expenseDate = new Date(expense.date);
//                 return expenseDate.toDateString() === today.toDateString();
//             });
//             break;
//         case 'weekly':
//             const startOfWeek = getStartOfWeek();
//             filteredExpenses = expenses.filter(expense => {
//                 const expenseDate = new Date(expense.date);
//                 return expenseDate >= startOfWeek && expenseDate <= today; // Include today
//             });
//             break;
//         case 'monthly':
//             const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
//             filteredExpenses = expenses.filter(expense => {
//                 const expenseDate = new Date(expense.date);
//                 return expenseDate >= startOfMonth && expenseDate <= today;
//             });
//             break;
//         default:
//             filteredExpenses = expenses; // No filter applied
//     }

//     return filteredExpenses;
// }

// // Display total expenses based on selected filter
// function displayFilteredExpenses(filter) {
//     const filteredExpenses = filterExpenses(filter);
//     const totalFilteredExpenses = filteredExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
//     totalExpenseOverlay.textContent = `Total Expenses (${filter}): Rs ${totalFilteredExpenses}`;
// }

// // Function to render expenses
// function renderExpenses() {
//     expenseList.innerHTML = '';
//     expenses.forEach((expense, index) => {
//         const li = document.createElement('li');
//         li.innerHTML = `
//             <span>${expense.name}</span>
//             <span>Rs ${expense.amount}</span>
//             <span>${expense.category}</span>
//             <span>${new Date(expense.date).toLocaleDateString()}</span> <!-- Displaying the date -->
//             <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
//             <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
//         `;
//         expenseList.appendChild(li);
//     });
// }

// // Function to delete an expense
// function deleteExpense(index) {
//     expenses.splice(index, 1);
//     localStorage.setItem('expenses', JSON.stringify(expenses));
//     renderExpenses();
//     updateChart();
//     displayFilteredExpenses(''); // Refresh displayed expenses after deletion
// }

// // Function to edit an expense
// function editExpense(index) {
//     const expense = expenses[index];
//     document.getElementById('expenseName').value = expense.name;
//     document.getElementById('expenseAmount').value = expense.amount;
//     document.getElementById('expenseCategory').value = expense.category;
//     document.getElementById('expenseDate').value = expense.date; // Set date for editing
//     editingExpense = index;

//     // Change button to "Update Expense"
//     submitButton.textContent = 'Update Expense';
//     submitButton.style.backgroundColor = 'orange'; // Change button color to indicate editing
// }

// // Function to update the chart
// function updateChart() {
//     const ctx = expenseChart.getContext('2d');
//     const labels = [...new Set(expenses.map(exp => exp.category))];
//     const data = labels.map(label => {
//         return expenses
//             .filter(exp => exp.category === label)
//             .reduce((total, exp) => total + parseFloat(exp.amount), 0);
//     });

//     new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: labels,
//             datasets: [{
//                 label: 'Expenses by Category',
//                 data: data,
//                 backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// }

// // Initialize application
// renderExpenses();
// updateChart();
// displayFilteredExpenses(''); // Display total expenses on load

// // Theme toggle functionality
// toggleThemeButton.addEventListener('click', function () {
//     document.body.classList.toggle('dark-mode');
//     toggleThemeButton.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
// });

// // Add event listener for "This Week" button (make sure to add this button in your HTML)
// const thisWeekButton = document.getElementById('thisWeekButton'); // Change to your actual button ID
// thisWeekButton.addEventListener('click', function() {
//     displayFilteredExpenses('weekly'); // Display weekly expenses
//     renderWeeklyExpenses(); // Call function to render weekly expenses
// });

// // Function to render weekly expenses
// function renderWeeklyExpenses() {
//     const filteredExpenses = filterExpenses('weekly');
//     expenseList.innerHTML = ''; // Clear the expense list
//     filteredExpenses.forEach((expense) => {
//         const li = document.createElement('li');
//         li.innerHTML = `
//             <span>${expense.name}</span>
//             <span>Rs ${expense.amount}</span>
//             <span>${expense.category}</span>
//             <span>${new Date(expense.date).toLocaleDateString()}</span>
//         `;
//         expenseList.appendChild(li);
//     });
// }

// DOM Elements
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenses');
const expenseChart = document.getElementById('expenseChart');
const toggleThemeButton = document.getElementById('toggleTheme');
const submitButton = document.querySelector('.btn');
const totalExpenseOverlay = document.createElement('div'); // Create overlay for total expenses
totalExpenseOverlay.id = 'totalExpenseOverlay';
document.querySelector('.analytics').appendChild(totalExpenseOverlay); // Append it to the analytics section
let editingExpense = null;

// Data store for expenses
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Event: Add or Update expense
expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('expenseName').value;
    const amount = document.getElementById('expenseAmount').value;
    const category = document.getElementById('expenseCategory').value;
    const date = document.getElementById('expenseDate').value; // Get date input

    if (!name || !amount || !category || !date) return;

    // Check if editing
    if (editingExpense !== null) {
        expenses[editingExpense] = { name, amount, category, date }; // Include date in update
        editingExpense = null;

        // Change button back to "Add Expense"
        submitButton.textContent = 'Add Expense';
        submitButton.style.backgroundColor = '#007bff'; // Reset to blue
    } else {
        // Add new expense to array
        expenses.push({ name, amount, category, date });
    }

    // Save to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Reset form and update UI
    expenseForm.reset();
    renderExpenses();
    updateChart();
    displayFilteredExpenses(''); // Refresh displayed expenses after adding new entry
});

// Function to get today's date
function getToday() {
    return new Date();
}

// Function to get the first day to the 7th day of the month
function getMonthStartToSeventh() {
    const today = getToday();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // 1st day of the month
    const seventhDay = new Date(today.getFullYear(), today.getMonth(), 7, 23, 59, 59);  // End of 7th day
    return { startOfMonth, seventhDay };
}

// Function to filter expenses by time period
function filterExpenses(timePeriod) {
    let filteredExpenses = [];
    const today = getToday();

    switch (timePeriod) {
        case 'today':
            filteredExpenses = expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate.toDateString() === today.toDateString();
            });
            break;
        case 'weekly':
            const { startOfMonth, seventhDay } = getMonthStartToSeventh();
            filteredExpenses = expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= startOfMonth && expenseDate <= seventhDay; // Include 7th day
            });
            break;
        case 'monthly':
            const startOfMonthAll = new Date(today.getFullYear(), today.getMonth(), 1);
            filteredExpenses = expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= startOfMonthAll && expenseDate <= today;
            });
            break;
        default:
            filteredExpenses = expenses; // No filter applied
    }

    return filteredExpenses;
}

// Display total expenses based on selected filter
function displayFilteredExpenses(filter) {
    const filteredExpenses = filterExpenses(filter);
    const totalFilteredExpenses = filteredExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
    totalExpenseOverlay.textContent = `Total Expenses (${filter}): Rs ${totalFilteredExpenses}`;
}

// Function to render expenses
function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.name}</span>
            <span>Rs ${expense.amount}</span>
            <span>${expense.category}</span>
            <span>${new Date(expense.date).toLocaleDateString()}</span> <!-- Displaying the date -->
            <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    updateChart();
    displayFilteredExpenses(''); // Refresh displayed expenses after deletion
}

// Function to edit an expense
function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('expenseName').value = expense.name;
    document.getElementById('expenseAmount').value = expense.amount;
    document.getElementById('expenseCategory').value = expense.category;
    document.getElementById('expenseDate').value = expense.date; // Set date for editing
    editingExpense = index;

    // Change button to "Update Expense"
    submitButton.textContent = 'Update Expense';
    submitButton.style.backgroundColor = 'orange'; // Change button color to indicate editing
}

// Function to update the chart
function updateChart() {
    const ctx = expenseChart.getContext('2d');
    const labels = [...new Set(expenses.map(exp => exp.category))];
    const data = labels.map(label => {
        return expenses
            .filter(exp => exp.category === label)
            .reduce((total, exp) => total + parseFloat(exp.amount), 0);
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses by Category',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize application
renderExpenses();
updateChart();
displayFilteredExpenses(''); // Display total expenses on load

// Theme toggle functionality
toggleThemeButton.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    toggleThemeButton.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

// Add event listener for "This Week" button (make sure to add this button in your HTML)
const thisWeekButton = document.getElementById('thisWeekButton'); // Change to your actual button ID
thisWeekButton.addEventListener('click', function() {
    displayFilteredExpenses('weekly'); // Display weekly expenses
    renderWeeklyExpenses(); // Call function to render weekly expenses
});

// Function to render weekly expenses
function renderWeeklyExpenses() {
    const filteredExpenses = filterExpenses('weekly');
    expenseList.innerHTML = ''; // Clear the expense list
    filteredExpenses.forEach((expense) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.name}</span>
            <span>Rs ${expense.amount}</span>
            <span>${expense.category}</span>
            <span>${new Date(expense.date).toLocaleDateString()}</span>
        `;
        expenseList.appendChild(li);
    });
}

