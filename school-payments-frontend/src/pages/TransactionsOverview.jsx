import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const TransactionsOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    fetchTransactions();
  }, [statusFilter, dateRange]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/transactions', {
        params: {
          search,
          status: statusFilter,
          start_date: dateRange.start,
          end_date: dateRange.end,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions Overview</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by custom_order_id"
          className="border px-2 py-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-2 py-1"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <input
          type="date"
          className="border px-2 py-1"
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <input
          type="date"
          className="border px-2 py-1"
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Collect ID</th>
            <th className="border px-2 py-1">School ID</th>
            <th className="border px-2 py-1">Gateway</th>
            <th className="border px-2 py-1">Order Amount</th>
            <th className="border px-2 py-1">Transaction Amount</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Custom Order ID</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.custom_order_id}>
              <td className="border px-2 py-1">{txn.collect_id}</td>
              <td className="border px-2 py-1">{txn.school_id}</td>
              <td className="border px-2 py-1">{txn.gateway}</td>
              <td className="border px-2 py-1">{txn.order_amount}</td>
              <td className="border px-2 py-1">{txn.transaction_amount}</td>
              <td className="border px-2 py-1">{txn.status}</td>
              <td className="border px-2 py-1">{txn.custom_order_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsOverview;
