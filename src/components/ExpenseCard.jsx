import React from 'react';

const ExpenseCard = ({ expense, onEdit, onDelete }) => {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between mb-3 border border-white/40 hover:scale-[1.02] transition-transform duration-200">
      <div className="flex-1">
        <div className="font-semibold text-lg text-blue-900 drop-shadow-sm">{expense.title}</div>
        <div className="text-gray-500 text-sm mb-1">{expense.category} | {new Date(expense.date).toLocaleDateString()}</div>
        <div className="text-blue-700 font-bold text-xl">${expense.amount}</div>
        {expense.notes && <div className="text-gray-400 text-xs mt-1 italic">{expense.notes}</div>}
      </div>
      <div className="flex gap-2 mt-3 sm:mt-0">
        <button onClick={onEdit} className="bg-yellow-400/80 px-4 py-2 rounded-lg text-white hover:bg-yellow-500/90 shadow">Edit</button>
        <button onClick={onDelete} className="bg-red-500/80 px-4 py-2 rounded-lg text-white hover:bg-red-600/90 shadow">Delete</button>
      </div>
    </div>
  );
};

export default ExpenseCard; 