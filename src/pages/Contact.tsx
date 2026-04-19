import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export const Contact = () => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-4xl mx-auto min-h-screen text-center">
      <h1 className="text-4xl font-display font-black mb-4">Contact Us</h1>
      <p className="text-gray-400 mb-12">
        Have questions or need support? Reach out to our dedicated staff.
      </p>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-neon-purple/50 transition-colors"
        >
          <Mail className="w-10 h-10 text-neon-purple mb-4" />
          <h3 className="text-xl font-bold mb-2">Email Support</h3>
          <p className="text-gray-400 mb-4">For billing inquiries and general support.</p>
          <a href="mailto:hakaistan@gmail.com" className="font-bold text-neon-pink">hakaistan@gmail.com</a>
          <p className="text-sm text-gray-500 mt-4">Owners: Sajid & Safin</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#5865F2]/10 border border-[#5865F2]/30 rounded-2xl p-8 hover:border-[#5865F2]/80 transition-colors"
        >
          <MessageCircle className="w-10 h-10 text-[#5865F2] mb-4" />
          <h3 className="text-xl font-bold mb-2">Discord Server</h3>
          <p className="text-gray-400 mb-4">Join our community for fast support and updates.</p>
          <a 
            href="https://discord.gg/d4xQDfweXS" 
            target="_blank" 
            rel="noreferrer"
            className="inline-block py-2 px-6 bg-[#5865F2] text-white rounded-xl font-bold hover:bg-[#4752C4] transition-colors"
          >
            Join Discord
          </a>
        </motion.div>
      </div>
    </div>
  );
};
