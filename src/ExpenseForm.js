import React, { useState, useEffect } from 'react';


function ExpenseForm({ addExpense, editExpense, expenseToEdit }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (expenseToEdit) {
      setDescription(expenseToEdit.description);
      setAmount(expenseToEdit.amount);
      setDate(expenseToEdit.date);
      setCategory(expenseToEdit.category);
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = { description, amount: parseFloat(amount), date, category };
    if (expenseToEdit) {
      newExpense.id = expenseToEdit.id;
      editExpense(newExpense);
    } else {
      addExpense(newExpense);
    }
    setDescription('');
    setAmount('');
    setDate('');
    setCategory('');
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <button type="submit">{expenseToEdit ? 'Update Expense' : 'Add Expense'}</button>
    </form>
  );
}

export default ExpenseForm;
