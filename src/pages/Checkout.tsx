import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ranks, crates } from '../lib/storeData';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export const Checkout = () => {
  const { type, id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<'bkash'|'nagad'>('bkash');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const product = type === 'rank' ? ranks.find(r => r.id === id) : crates.find(c => c.id === id);

  if (!product) return <div className="pt-32 text-center text-white">Product not found.</div>;
  if (!currentUser) {
    return (
      <div className="pt-32 text-center text-white">
        <p className="mb-4">You must be logged in to checkout.</p>
        <button onClick={() => navigate('/auth')} className="px-6 py-2 bg-neon-purple rounded-xl font-bold">Login Now</button>
      </div>
    );
  }

  const handlePayment = async () => {
    setLoading(true);
    // Simulate real bKash/Nagad checkout and webhook processing
    setTimeout(async () => {
      try {
        const orderId = `ord_${Date.now()}`;
        const now = new Date().toISOString();
        
        await setDoc(doc(db, "orders", orderId), {
          userId: currentUser.uid,
          productType: type,
          productId: id,
          amount: product.price,
          status: 'pending', // in a real app, this creates order. Then backend updates to 'completed'
          provider: provider,
          createdAt: now
        });
        
        // Mock webhook finalizing it for demo purpose:
        await fetch('/api/payments/webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, status: 'completed' })
        });
        
        setSuccess(true);
      } catch (err) {
        console.error(err);
        alert("Checkout failed");
      }
      setLoading(false);
    }, 2000);
  };

  if (success) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="bg-[#1a112c] p-12 rounded-3xl text-center max-w-md w-full border border-neon-purple/20">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
          <p className="text-gray-400 mb-8">Your {product.name} will be added to your account shortly.</p>
          <button onClick={() => navigate('/dashboard')} className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-2xl mx-auto min-h-screen">
      <h1 className="text-4xl font-display font-black mb-8 border-b border-white/10 pb-4">Checkout</h1>
      
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-400 mb-2">Order Summary</h3>
        <div className="flex justify-between items-center text-xl font-bold">
          <span>{product.name} ({type})</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">${product.price}</span>
        </div>
      </div>

      <div className="space-y-4 mb-10">
        <h3 className="text-lg font-medium text-gray-400">Select Payment Method</h3>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setProvider('bkash')}
            className={`p-6 rounded-2xl border-2 flex items-center justify-center transition-all ${
              provider === 'bkash' ? 'border-[#e2136e] bg-[#e2136e]/10' : 'border-white/10 bg-white/5 hover:border-white/30'
            }`}
          >
            <span className="font-bold text-xl" style={{ color: provider === 'bkash' ? '#e2136e' : 'white' }}>bKash</span>
          </button>
          <button 
            onClick={() => setProvider('nagad')}
            className={`p-6 rounded-2xl border-2 flex items-center justify-center transition-all ${
              provider === 'nagad' ? 'border-[#f37021] bg-[#f37021]/10' : 'border-white/10 bg-white/5 hover:border-white/30'
            }`}
          >
            <span className="font-bold text-xl" style={{ color: provider === 'nagad' ? '#f37021' : 'white' }}>Nagad</span>
          </button>
        </div>
      </div>

      <button 
        onClick={handlePayment}
        disabled={loading}
        className="w-full py-5 bg-gradient-to-r from-neon-purple to-neon-pink hover:to-pink-500 rounded-xl font-bold text-xl flex items-center justify-center disabled:opacity-50 transition-transform hover:scale-[1.02]"
      >
        {loading ? <span className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></span> : `Pay $${product.price} via ${provider}`}
      </button>
    </div>
  );
};
