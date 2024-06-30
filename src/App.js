import React, { useState, useEffect } from 'react';
import './App.css';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

function App() {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const editExpense = (updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    setExpenseToEdit(null);
  };

  const deleteExpense = (expenseToDelete) => {
    const filteredExpenses = expenses.filter((expense) => expense.id !== expenseToDelete.id);
    setExpenses(filteredExpenses);
  };

  const clearExpenses = () => {
    setExpenses([]);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmountRange({
      ...amountRange,
      [event.target.name]: event.target.value,
    });
  };

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const matchesMonth = selectedMonth === 'all' || expenseDate.getMonth() === parseInt(selectedMonth);
    const matchesYear = selectedYear === 'all' || expenseDate.getFullYear() === parseInt(selectedYear);
    const matchesMinAmount = amountRange.min === '' || expense.amount >= parseFloat(amountRange.min);
    const matchesMaxAmount = amountRange.max === '' || expense.amount <= parseFloat(amountRange.max);
    return matchesMonth && matchesYear && matchesMinAmount && matchesMaxAmount;
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <ExpenseForm
          addExpense={addExpense}
          editExpense={editExpense}
          expenseToEdit={expenseToEdit}
        />
        <div className="filter-container">
          <div className="filter">
            <label htmlFor="month-filter">Filter by Month: </label>
            <select id="month-filter" value={selectedMonth} onChange={handleMonthChange}>
              <option value="all">All</option>
              <option value="0">January</option>
              <option value="1">February</option>
              <option value="2">March</option>
              <option value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="year-filter">Filter by Year: </label>
            <select id="year-filter" value={selectedYear} onChange={handleYearChange}>
              <option value="all">All</option>
              {Array.from(new Set(expenses.map(exp => new Date(exp.date).getFullYear())))
                .sort((a, b) => a - b)
                .map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
            </select>
          </div>
          <div className="filter">
            <label htmlFor="min-amount">Min Amount: </label>
            <input
              type="number"
              id="min-amount"
              name="min"
              value={amountRange.min}
              onChange={handleAmountChange}
            />
          </div>
          <div className="filter">
            <label htmlFor="max-amount">Max Amount: </label>
            <input
              type="number"
              id="max-amount"
              name="max"
              value={amountRange.max}
              onChange={handleAmountChange}
            />
          </div>
        </div>
        <ExpenseList
          expenses={filteredExpenses}
          onEdit={setExpenseToEdit}
          onDelete={deleteExpense}
          onClear={clearExpenses}
        />
      </main>
    </div>
  );
}

export default App;
