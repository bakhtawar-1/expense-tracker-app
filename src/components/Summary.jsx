import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#2563eb', '#f59e42', '#10b981', '#f43f5e', '#a78bfa', '#fbbf24'];

const Summary = ({ expenses }) => {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const data = Object.values(
    expenses.reduce((acc, e) => {
      acc[e.category] = acc[e.category] || { name: e.category, value: 0 };
      acc[e.category].value += e.amount;
      return acc;
    }, {})
  );

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-8 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="text-2xl font-extrabold mb-2 md:mb-0 text-blue-700 drop-shadow-lg">
        Total Spent: <span className="text-blue-500">${total}</span>
      </div>
      <div className="h-56 w-full md:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ value }) => `$${value}`}
              labelLine={false}
            >
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Summary; 