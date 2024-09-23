// Функция для отображения целей
document.getElementById("goal-form").addEventListener("submit", function(e) {
  e.preventDefault();
  let goalName = document.getElementById("goal-name").value;
  let targetAmount = document.getElementById("target-amount").value;
  let dueDate = document.getElementById("due-date").value;

  let goals = JSON.parse(localStorage.getItem("goals")) || [];
  goals.push({ goalName, targetAmount, dueDate });
  localStorage.setItem("goals", JSON.stringify(goals));

  displayGoals();
});
// Калькулятор
document.getElementById("calculate-button").addEventListener("click", function() {
  let incomeInput = Number(document.getElementById("income-input").value) || 0;
  let expenseInput = Number(document.getElementById("expense-input").value) || 0;

  // Обновление результатов
  document.getElementById("calculated-income").textContent = incomeInput.toFixed(2);
  document.getElementById("calculated-expenses").textContent = expenseInput.toFixed(2);
  document.getElementById("calculated-balance").textContent = (incomeInput - expenseInput).toFixed(2);
});

// Отображение целей
function displayGoals() {
  let goals = JSON.parse(localStorage.getItem("goals")) || [];
  let goalList = document.getElementById("goal-list");
  goalList.innerHTML = "";
  goals.forEach((goal) => {
    goalList.innerHTML += `<p>${goal.goalName}: $${goal.targetAmount} (Срок: ${goal.dueDate})</p>`;
  });
}
displayGoals();

// Функция для отображения расходов
document.getElementById("expense-form").addEventListener("submit", function(e) {
  e.preventDefault();
  let expenseCategory = document.getElementById("expense-category").value;
  let expenseAmount = document.getElementById("expense-amount").value;
  let expenseDate = document.getElementById("expense-date").value;

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push({ expenseCategory, expenseAmount, expenseDate });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpenses();
  updateSummary();
});

// Отображение расходов
function displayExpenses() {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let expenseList = document.getElementById("expense-list");
  expenseList.innerHTML = "";
  expenses.forEach((expense) => {
    expenseList.innerHTML += `<p>${expense.expenseCategory}: $${expense.expenseAmount} (Дата: ${expense.expenseDate})</p>`;
  });
}
displayExpenses();

// Функция для отображения доходов
document.getElementById("income-form").addEventListener("submit", function(e) {
  e.preventDefault();
  let incomeSource = document.getElementById("income-source").value;
  let incomeAmount = document.getElementById("income-amount").value;
  let incomeDate = document.getElementById("income-date").value;

  let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  incomes.push({ incomeSource, incomeAmount, incomeDate });
  localStorage.setItem("incomes", JSON.stringify(incomes));

  displayIncomes();
  updateSummary();
});

// Отображение доходов
function displayIncomes() {
  let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  let incomeList = document.getElementById("income-list");
  incomeList.innerHTML = "";
  incomes.forEach((income) => {
    incomeList.innerHTML += `<p>${income.incomeSource}: $${income.incomeAmount} (Дата: ${income.incomeDate})</p>`;
  });
}
displayIncomes();

// Функция для обновления сводки
function updateSummary() {
  let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  let totalIncome = incomes.reduce((acc, income) => acc + Number(income.incomeAmount), 0);
  let totalExpenses = expenses.reduce((acc, expense) => acc + Number(expense.expenseAmount), 0);
  let balance = totalIncome - totalExpenses;

  document.getElementById("total-income").textContent = totalIncome.toFixed(2);
  document.getElementById("total-expenses").textContent = totalExpenses.toFixed(2);
  document.getElementById("balance").textContent = balance.toFixed(2);
}

// Обновление сводки при загрузке страницы
window.onload = function() {
  displayGoals();
  displayExpenses();
  displayIncomes();
  updateSummary();
};
