import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ranks, crates } from '../lib/storeData';
import { ShieldAlert, Package } from 'lucide-react';

export const Store = () => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-black mb-4">Server Store</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Support Brother Craft Land by purchasing ranks and crates. Your contribution helps keep the server running and updated!
        </p>
      </div>

      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <ShieldAlert className="text-neon-purple w-8 h-8" />
          <h2 className="text-3xl font-bold">Ranks</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ranks.map((rank, idx) => (
            <motion.div
              key={rank.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#1a112c]/80 border border-white/5 rounded-2xl p-6 hover:border-neutral-500 transition-colors flex flex-col group glow-border"
            >
              <div className={`h-2 w-16 mb-4 rounded-full bg-gradient-to-r ${rank.color}`}></div>
              <h3 className="text-2xl font-bold mb-2">{rank.name}</h3>
              <div className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink mb-4">
                ${rank.price}
              </div>
              <p className="text-gray-400 mb-6 flex-grow">{rank.description}</p>
              <Link 
                to={`/store/rank/${rank.id}`}
                className="w-full py-3 text-center rounded-xl bg-white/5 hover:bg-white/10 font-bold transition-colors"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <Package className="text-neon-pink w-8 h-8" />
          <h2 className="text-3xl font-bold">Crates</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {crates.map((crate, idx) => (
            <motion.div
              key={crate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#1a112c]/80 border border-white/5 rounded-2xl p-6 hover:border-neutral-500 transition-colors flex flex-col group glow-border"
            >
              <div className={`h-2 w-16 mb-4 rounded-full bg-gradient-to-r ${crate.color}`}></div>
              <h3 className="text-2xl font-bold mb-2">{crate.name}</h3>
              <div className="text-3xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink mb-4">
                ${crate.price}
              </div>
              <p className="text-gray-400 mb-6 flex-grow">{crate.description}</p>
              <Link 
                to={`/store/crate/${crate.id}`}
                className="w-full py-3 text-center rounded-xl bg-white/5 hover:bg-white/10 font-bold transition-colors"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
