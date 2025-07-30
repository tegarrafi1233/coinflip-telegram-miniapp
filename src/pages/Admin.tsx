import React, { useEffect, useState } from 'react';

interface Request {
  id: number;
  user: string;
  type: string;
  amount: number;
  status: string;
}

const API_URL = 'http://localhost:4000/api/requests';

const Admin: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari backend
  const fetchRequests = async () => {
    setLoading(true);
    const res = await fetch(API_URL);
    const data = await res.json();
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve/Reject
  const handleAction = async (id: number, action: 'approved' | 'rejected') => {
    await fetch(`${API_URL}/${id}/${action}`, { method: 'POST' });
    fetchRequests(); // refresh data
  };

  if (loading) {
    return <div className="text-white text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-white">Admin Panel</h1>
      <div className="space-y-4">
        {requests.map(req => (
          <div key={req.id} className="bg-dark-card p-4 rounded-xl border border-dark-border flex justify-between items-center">
            <div>
              <div className="font-semibold text-white">{req.type.toUpperCase()} {req.amount} TON</div>
              <div className="text-sm text-white/70">User: {req.user}</div>
              <div className={`text-xs mt-1 ${req.status === 'pending' ? 'text-yellow-400' : req.status === 'approved' ? 'text-green-400' : 'text-red-400'}`}>
                Status: {req.status}
              </div>
            </div>
            {req.status === 'pending' && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAction(req.id, 'approved')}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg"
                >Approve</button>
                <button
                  onClick={() => handleAction(req.id, 'rejected')}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg"
                >Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;