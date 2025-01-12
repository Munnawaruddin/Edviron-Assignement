import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const TransactionBySchool = () => {
  const [schoolId, setSchoolId] = useState('');
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`/transactions/school/${schoolId}`);
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions by School</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter School ID"
          className="border px-2 py-1"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={fetchTransactions}
        >
          Fetch Transactions
        </button>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Collect ID</th>
            <th className="border px-2 py-1">Gateway</th>
            <th className="border px-2 py-1">Order Amount</th>
            <th className="border px-2 py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.custom_order_id}>
              <td className="border px-2 py-1">{txn.collect_id}</td>
              <td className="border px-2 py-1">{txn.gateway}</td>
              <td className="border px-2 py-1">{txn.order_amount}</td>
              <td className="border px-2 py-1">{txn.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionBySchool;
