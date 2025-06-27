import React from 'react';
import ExpenseCard from './ExpenseCard';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (!expenses.length) return <div className="text-center text-gray-400">No expenses yet.</div>;
  return (
    <div className="mt-4 grid gap-4">
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          onEdit={() => onEdit(expense)}
          onDelete={() => onDelete(expense.id)}
        />
      ))}
    </div>
  );
};

export default ExpenseList; 