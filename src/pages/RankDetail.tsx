import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ranks } from '../lib/storeData';
import { Check, ArrowLeft } from 'lucide-react';

export const RankDetail = () => {
  const { id } = useParams();
  const rank = ranks.find(r => r.id === id);

  if (!rank) {
    return <div className="pt-32 text-center text-white">Rank not found</div>;
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
        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${rank.color}`}></div>
        
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black font-display mb-2">{rank.name} Rank</h1>
              <p className="text-gray-400 text-lg">{rank.description}</p>
            </div>
            <div className="text-center">
              <span className="block text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">
                ${rank.price}
              </span>
              <span className="text-gray-500 text-sm uppercase tracking-wider">Lifetime</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 mb-8 border border-white/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              Rank Perks & Features
            </h3>
            <ul className="grid sm:grid-cols-2 gap-4">
              {rank.perks.map((perk, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-neon-purple/20 p-1 rounded-full text-neon-purple">
                    <Check size={14} />
                  </div>
                  <span className="text-gray-300">{perk}</span>
                </li>
              ))}
            </ul>
          </div>

          <Link 
            to={`/checkout/rank/${rank.id}`}
            className="block w-full py-5 text-center bg-gradient-to-r from-neon-purple to-neon-pink hover:to-pink-500 rounded-xl font-bold text-xl glow-box transition-transform hover:scale-[1.02]"
          >
            Purchase {rank.name}
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
