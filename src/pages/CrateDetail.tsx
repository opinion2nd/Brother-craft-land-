import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { crates } from '../lib/storeData';
import { Focus, ArrowLeft } from 'lucide-react';

export const CrateDetail = () => {
  const { id } = useParams();
  const crate = crates.find(c => c.id === id);

  if (!crate) {
    return <div className="pt-32 text-center text-white">Crate not found</div>;
  }

  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto min-h-screen">
      <Link to="/store" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to Store
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1a112c] border border-white/10 rounded-3xl overflow-hidden relative"
      >
        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${crate.color}`}></div>
        
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black font-display mb-2">{crate.name}</h1>
              <p className="text-gray-400 text-lg">{crate.description}</p>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">
                ${crate.price}
              </span>
              <span className="text-gray-500 text-sm uppercase tracking-wider">Per Key</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 mb-8 border border-white/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              Possible Rewards
            </h3>
            <div className="grid gap-4">
              {crate.rewards.map((reward, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-neon-purple/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Focus className="text-neon-pink w-5 h-5" />
                    <span className="font-medium text-gray-200">{reward.name}</span>
                  </div>
                  <span className="text-sm font-bold bg-white/10 px-3 py-1 rounded-full text-neon-purple">
                    {reward.chance} Change
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link 
            to={`/checkout/crate/${crate.id}`}
            className="block w-full py-5 text-center bg-gradient-to-r from-neon-purple to-neon-pink hover:to-pink-500 rounded-xl font-bold text-xl glow-box transition-transform hover:scale-[1.02]"
          >
            Purchase Crate Key
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
