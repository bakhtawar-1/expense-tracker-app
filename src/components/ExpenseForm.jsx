import React, { useState } from 'react';

const categories = ['Food', 'Utilities', 'Transport', 'Entertainment', 'Shopping', 'Other'];

const ExpenseForm = ({ onSubmit, initialData, onCancel }) => {
  const [form, setForm] = useState(
    initialData || {
      title: '',
      amount: '',
      category: '',
      date: '',
      notes: '',
    }
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) errs.amount = 'Amount must be positive';
    if (!form.category) errs.category = 'Category is required';
    if (!form.date) errs.date = 'Date is required';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSubmit({ ...form, amount: Number(form.amount) });
    setForm({ title: '', amount: '', category: '', date: '', notes: '' });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 space-y-5 border border-white/40">
      <div>
        <label className="block font-semibold text-blue-900">Title *</label>
        <input name="title" value={form.title} onChange={handleChange} className="mt-1 w-full border-none rounded px-3 py-2 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none" />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      <div>
        <label className="block font-semibold text-blue-900">Amount ($) *</label>
        <input name="amount" type="number" value={form.amount} onChange={handleChange} className="mt-1 w-full border-none rounded px-3 py-2 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none" />
        {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
      </div>
      <div>
        <label className="block font-semibold text-blue-900">Category *</label>
        <select name="category" value={form.category} onChange={handleChange} className="mt-1 w-full border-none rounded px-3 py-2 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none">
          <option value="">Select</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>
      <div>
        <label className="block font-semibold text-blue-900">Date *</label>
        <input name="date" type="date" value={form.date} onChange={handleChange} className="mt-1 w-full border-none rounded px-3 py-2 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none" />
        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
      </div>
      <div>
        <label className="block font-semibold text-blue-900">Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} className="mt-1 w-full border-none rounded px-3 py-2 bg-white/70 focus:ring-2 focus:ring-blue-400 outline-none" />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="submit" className="bg-blue-600/90 text-white px-6 py-2 rounded-lg hover:bg-blue-700/90 shadow">{initialData ? 'Update' : 'Add'} Expense</button>
        {onCancel && <button type="button" onClick={onCancel} className="bg-gray-300/80 px-6 py-2 rounded-lg hover:bg-gray-400/90 shadow">Cancel</button>}
      </div>
    </form>
  );
};

export default ExpenseForm; 