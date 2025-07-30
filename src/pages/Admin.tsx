import React, { useEffect, useState } from 'react';

interface Request {
  id: number;
  user: string;
  type: string;
  amount: number;
  status: string;
}

interface AdminProps {
  isAdmin: boolean;
  user: any;
}

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/requests';

const Admin: React.FC<AdminProps> = ({ isAdmin, user }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari backend
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchRequests();
    }
  }, [isAdmin]);

  // Approve/Reject
  const handleAction = async (id: number, action: 'approved' | 'rejected') => {
    try {
      await fetch(`${API_URL}/${id}/${action}`, { method: 'POST' });
      fetchRequests(); // refresh data
    } catch (error) {
      console.error('Error handling action:', error);
    }
  };

  // Jika bukan admin, tampilkan pesan akses ditolak
  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto py-8">
        <div className="bg-dark-card p-6 rounded-xl border border-dark-border text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-400">⛔ Akses Ditolak</h1>
          <p className="text-white/70 mb-4">
            Anda tidak memiliki akses ke halaman admin.
          </p>
          {user && (
            <div className="bg-dark-bg p-3 rounded-lg">
              <p className="text-sm text-white/50">User ID: {user.id}</p>
              <p className="text-sm text-white/50">Username: @{user.username || 'N/A'}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-xl mx-auto py-8">
        <div className="text-white text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coin-gold mx-auto mb-4"></div>
          Loading admin data...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="bg-dark-card p-6 rounded-xl border border-dark-border mb-6">
        <h1 className="text-2xl font-bold mb-2 text-white">🔐 Admin Panel</h1>
        <p className="text-white/70 mb-4">Selamat datang, Admin!</p>
        {user && (
          <div className="bg-dark-bg p-3 rounded-lg">
            <p className="text-sm text-white/50">Logged in as: @{user.username || 'N/A'}</p>
            <p className="text-sm text-white/50">User ID: {user.id}</p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">📋 Deposit & Withdraw Requests</h2>
        
        {requests.length === 0 ? (
          <div className="bg-dark-card p-6 rounded-xl border border-dark-border text-center">
            <p className="text-white/70">Belum ada request yang masuk</p>
          </div>
        ) : (
          requests.map(req => (
            <div key={req.id} className="bg-dark-card p-4 rounded-xl border border-dark-border">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-semibold text-white">
                    {req.type.toUpperCase()} {req.amount} TON
                  </div>
                  <div className="text-sm text-white/70">User: {req.user}</div>
                  <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
                    req.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 
                    req.status === 'approved' ? 'bg-green-500/20 text-green-400' : 
                    'bg-red-500/20 text-red-400'
                  }`}>
                    Status: {req.status}
                  </div>
                </div>
                <div className="text-xs text-white/50">ID: {req.id}</div>
              </div>
              
              {req.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAction(req.id, 'approved')}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleAction(req.id, 'rejected')}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;