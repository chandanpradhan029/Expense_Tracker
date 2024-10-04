# Advanced Expense Tracker

An advanced, feature-rich expense tracker application built using HTML, CSS, JavaScript, and Chart.js. This app allows users to add, edit, and delete expenses, and provides filters for daily, weekly, and monthly expense reports. It also includes a graphical representation of expenses by category and theme toggle functionality.

## Features

- **Add, Edit, Delete Expenses**: Users can add new expenses, update existing ones, or delete unnecessary entries.
- **Expense Categories**: Each expense can be categorized (e.g., Food, Travel, Shopping).
- **Date Selection**: Each expense entry is tied to a specific date, which can be selected when adding or editing expenses.
- **Expense Summary**: The app shows the total expenses for today, this week, and this month.
- **Weekly Filter**: Shows weekly expenses
- **Monthly Filter**: Shows expenses for the last 30 days.
- **Chart Representation**: Displays expenses by category using a bar chart powered by Chart.js.
- **Theme Toggle**: Switch between Light Mode and Dark Mode for better user experience.
- **LocalStorage**: All expenses are stored in the browser’s LocalStorage, ensuring persistence even after the page reloads.

## Getting Started

### Prerequisites

- A modern web browser (Google Chrome, Firefox, etc.).
- No server-side components are required. The app runs entirely on the client side using LocalStorage.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/advanced-expense-tracker.git
    ```
2. Navigate to the project directory:
    ```bash
    cd advanced-expense-tracker
    ```
3. Open `index.html` in your preferred browser.

### Usage

1. **Add Expense**: Fill in the expense name, amount, category, and date. Click "Add Expense" to save the entry.
2. **Edit Expense**: Click the "Edit" button next to any expense, update the details, and click "Update Expense" to save changes.
3. **Delete Expense**: Click the "Delete" button next to an expense to remove it.
4. **Filter Expenses**: Use the buttons to filter expenses for today, this week, or this month.
5. **View Chart**: A bar chart shows total expenses grouped by category.
6. **Toggle Theme**: Use the "Dark Mode" button to switch between Light and Dark themes.



### Built With

- **HTML/CSS**: For structuring and styling the application.
- **JavaScript**: Handles functionality, event listeners, and data management.
- **Chart.js**: Renders the bar chart displaying expenses by category.
- **LocalStorage**: Stores expense data locally within the browser.


## Screenshots

![Expense Tracker Light Mode](./screenshots/light-mode.png)
![Expense Tracker Dark Mode](./screenshots/dark-mode.png)



## Website


