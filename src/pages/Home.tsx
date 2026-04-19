import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Copy, Users, Gamepad2, PlaySquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [copied, setCopied] = useState(false);
  const [serverStats, setServerStats] = useState({ online: true, players: 142, max: 500 });
  const serverIp = "play.brothercraftland.net";

  const handleCopy = () => {
    navigator.clipboard.writeText(serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // In reality, this would hit our /api/server/status
    fetch('/api/server/status')
      .then(res => res.json())
      .then(data => {
        if(data.online) {
          setServerStats({ online: true, players: data.players.online, max: data.players.max });
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 mb-8">
            <div className={`w-3 h-3 rounded-full ${serverStats.online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium">{serverStats.players} Players Online</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-display font-black mb-6 tracking-tight">
            BROTHER CRAFT <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink glow-text">
              LAND
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            The ultimate Survival & PvP Experience. Forge alliances, build empires, and dominate the realm.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-neon-purple/50 rounded-xl transition-all w-full sm:w-auto overflow-hidden relative group glow-border"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Gamepad2 className="text-neon-purple" />
              <div className="text-left">
                <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Server IP</div>
                <div className="font-mono font-bold text-lg">{copied ? "COPIED!" : serverIp}</div>
              </div>
              <Copy size={20} className="ml-4 text-gray-500 group-hover:text-white transition" />
            </button>

            <Link 
              to="/store"
              className="px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-pink hover:to-pink-500 rounded-xl font-bold text-lg flex items-center justify-center gap-2 glow-box w-full sm:w-auto transition-transform hover:scale-105"
            >
              <ShoppingBagIcon className="w-6 h-6" />
              View Store
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-32 grid md:grid-cols-3 gap-8 text-left"
        >
          {[
            { title: "Custom Survival", desc: "Enhanced vanilla experience with custom items, economies, and lands.", icon: <PlaySquare className="text-neon-purple w-8 h-8"/> },
            { title: "Active Community", desc: "Join our discord and interact with hundreds of passionate players.", icon: <Users className="text-neon-pink w-8 h-8"/> },
            { title: "Fair Play Store", desc: "Cosmetics, ranks, and crates that support the server without pay-to-win.", icon: <ShoppingCartIcon className="text-neon-purple w-8 h-8"/> }
          ].map((feature, i) => (
            <div key={i} className="bg-[#1a112c]/50 border border-white/5 p-8 rounded-2xl glow-border">
              <div className="bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Quick Icons
function ShoppingBagIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
}
function ShoppingCartIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;
}
