import React from 'react';
import './ExpenseList.css'; // Import CSS file
import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, onEdit, onDelete, onClear }) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="expense-list">
      <h2>Total Expenses: ${total.toFixed(2)}</h2>
      <button onClick={onClear}>Clear All</button>
      <ul>
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id} // Use unique id as key
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
