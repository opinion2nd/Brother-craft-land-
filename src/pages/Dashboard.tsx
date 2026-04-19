import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Package, Shield } from 'lucide-react';
import { ranks, crates } from '../lib/storeData';

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if(!currentUser) return;
    const fetchProfile = async () => {
      const pDoc = await getDoc(doc(db, "users", currentUser.uid));
      if(pDoc.exists()) setProfile(pDoc.data());
    }
    const fetchOrders = async () => {
      const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid));
      const snaps = await getDocs(q);
      setOrders(snaps.docs.map(d => ({id: d.id, ...d.data()})));
    };

    fetchProfile();
    fetchOrders();
  }, [currentUser]);

  if (!currentUser) return <div className="pt-32 text-center">Login Required</div>;

  return (
    <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto min-h-screen">
      <div className="grid md:grid-cols-3 gap-8">
        
        <div className="md:col-span-1">
          <div className="bg-[#1a112c] border border-white/10 rounded-3xl p-8 glow-box sticky top-24">
            <div className="w-24 h-24 bg-neon-purple/20 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Shield className="w-12 h-12 text-neon-purple" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">{profile?.minecraftUsername || 'Unknown'}</h2>
            <p className="text-gray-400 text-center mb-6">{currentUser.email}</p>
            
            <div className="pt-6 border-t border-white/5 space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Current Rank</p>
                <div className="font-bold text-neon-pink uppercase">
                  {profile?.rank || 'Default'}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Account Created</p>
                <div className="font-bold">
                  {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Package className="text-neon-purple" />
              Purchase History
            </h3>
            
            {orders.length === 0 ? (
              <p className="text-gray-400">No purchases yet. Visit the store to support the server!</p>
            ) : (
              <div className="space-y-4">
                {orders.map(order => {
                  const item = order.productType === 'rank' 
                    ? ranks.find(r => r.id === order.productId) 
                    : crates.find(c => c.id === order.productId);
                  return (
                    <div key={order.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-[#1a112c] rounded-xl border border-white/5">
                      <div>
                        <div className="font-bold text-lg">{item?.name || order.productId}</div>
                        <div className="text-sm text-gray-400">ID: {order.id}</div>
                      </div>
                      <div className="mt-4 sm:mt-0 text-right">
                        <div className="font-bold text-neon-pink overflow-hidden">${order.amount}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider bg-white/5 px-2 py-1 rounded inline-block mt-1">
                          Via {order.provider} • {order.status}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
