import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';

const DEFAULT_EXPENSES = [
  {
    id: 1,
    title: 'Dinner with friends',
    amount: 2200,
    category: 'Food',
    date: new Date().toISOString().slice(0, 10),
    notes: 'Pizza and drinks at local restaurant',
  },
  {
    id: 2,
    title: 'Electricity Bill',
    amount: 1500,
    category: 'Utilities',
    date: new Date(Date.now() - 86400000 * 3).toISOString().slice(0, 10),
    notes: 'Paid for June',
  },
];

const backgroundUrl =
  "https://media.istockphoto.com/id/1462932996/photo/cost-and-quality-control-business-strategy-and-project-management-concept-businessman-working.jpg?s=612x612&w=0&k=20&c=TUVDo4Q6uUpsJCssPxQ05egXtfFoHT0AEd78yMWTW80=";

function App() {
  const [expenses, setExpenses] = useState(DEFAULT_EXPENSES);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (expense) => {
    setExpenses([
      { ...expense, id: Date.now() },
      ...expenses,
    ]);
    setShowForm(false);
  };

  const handleEdit = (expense) => {
    setEditing(expense);
    setShowForm(true);
  };

  const handleUpdate = (updated) => {
    setExpenses(expenses.map(e => e.id === editing.id ? { ...updated, id: editing.id } : e));
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this expense?')) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div className={`relative min-h-screen bg-center bg-cover bg-no-repeat`} style={{ backgroundImage: `url('${backgroundUrl}')` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/30 z-0"></div>
      {/* Main content */}
      <div className="relative z-10 min-h-screen p-2 sm:p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-700 drop-shadow">Expense Tracker</h1>
          <Summary expenses={expenses} />
          {showForm ? (
            <ExpenseForm
              onSubmit={editing ? handleUpdate : handleAdd}
              initialData={editing}
              onCancel={handleCancel}
            />
          ) : (
            <div className="flex justify-end mb-4">
              <button
                onClick={() => { setShowForm(true); setEditing(null); }}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Expense
              </button>
            </div>
          )}
          <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;