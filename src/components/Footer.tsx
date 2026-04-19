import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-neon-purple/20 bg-[#0f0a1c] pt-12 pb-8 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink mb-4">
          Brother Craft Land
        </h3>
        <p className="text-gray-400 mb-6 max-w-lg mx-auto">
          The ultimate Minecraft survival and PvP experience. Join hundreds of players exploring our custom world today.
        </p>
        <div className="text-sm text-gray-500">
          <p>Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.</p>
          <p className="mt-2">© {new Date().getFullYear()} Brother Craft Land. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
