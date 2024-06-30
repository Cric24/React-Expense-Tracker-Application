import React from 'react';


function ExpenseItem({ expense, onEdit, onDelete }) {
  return (
    <li className="expense-item">
      <span className="date">{new Date(expense.date).toLocaleDateString()}</span>
      <span className="description">{expense.description}</span>
      <span className="category">{expense.category}</span>
      <span className="amount">${expense.amount.toFixed(2)}</span>
      <button onClick={() => onEdit(expense)}>Edit</button>
      <button onClick={() => onDelete(expense)}>Delete</button>
    </li>
  );
}

export default ExpenseItem;
