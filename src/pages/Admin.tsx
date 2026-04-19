import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Users, CreditCard } from 'lucide-react';

export const Admin = () => {
  const { currentUser, isAdmin, loading } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if(!isAdmin) return;
    const fetchAll = async () => {
      try {
        const uSnaps = await getDocs(collection(db, "users"));
        setUsers(uSnaps.docs.map(d => ({id: d.id, ...d.data()})));

        const oSnaps = await getDocs(collection(db, "orders"));
        setOrders(oSnaps.docs.map(d => ({id: d.id, ...d.data()})));
      } catch (err) {
        console.error("Failed fetching admin data. Make sure rules allow admins to read all docs.", err);
      }
    };
    fetchAll();
  }, [isAdmin]);

  if (loading) return null;

  if (!isAdmin) {
    return <div className="pt-32 text-center text-red-500 font-bold">Access Denied. Admins Only.</div>;
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-display font-black mb-8 border-b border-red-500/20 pb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
        Admin Control Panel
      </h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <Users className="w-8 h-8 text-red-400" />
            <h2 className="text-2xl font-bold">Registered Users</h2>
          </div>
          <div className="text-4xl font-black">{users.length}</div>
        </div>

        <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <CreditCard className="w-8 h-8 text-red-400" />
            <h2 className="text-2xl font-bold">Total Orders</h2>
          </div>
          <div className="text-4xl font-black">{orders.length}</div>
        </div>
      </div>

      <div className="bg-[#1a112c] border border-white/5 rounded-3xl p-8 mb-8 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-white/10">
              <th className="pb-4">Order ID</th>
              <th className="pb-4">User ID</th>
              <th className="pb-4">Product</th>
              <th className="pb-4">Method</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 10).map(o => (
              <tr key={o.id} className="border-b border-white/5">
                <td className="py-4 text-sm font-mono text-gray-400">{o.id}</td>
                <td className="py-4 text-sm">{o.userId}</td>
                <td className="py-4 capitalize">{o.productType}: {o.productId}</td>
                <td className="py-4 uppercase text-xs">{o.provider}</td>
                <td className="py-4 text-neon-pink font-bold">${o.amount}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded text-xs uppercase font-bold
                    ${o.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}
                  `}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
