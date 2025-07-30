import React, { useEffect, useState } from 'react';

interface Request {
  id: number;
  user: string;
  type: string;
  amount: number;
  status: string;
}

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  balance: number;
  totalEarned: number;
  referrals: number;
  isNewUser: boolean;
  hasWelcomeBonus: boolean;
  freeFlips: number;
  joinDate: string;
}

interface Stats {
  totalUsers: number;
  totalRequests: number;
  pendingRequests: number;
  totalDeposits: number;
  totalWithdrawals: number;
}

interface AdminProps {
  isAdmin: boolean;
  user: any;
}

// Dummy data for when backend is not available
const dummyUsers: User[] = [
  {
    id: 7609121993,
    username: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    balance: 10.0,
    totalEarned: 15.0,
    referrals: 5,
    isNewUser: false,
    hasWelcomeBonus: true,
    freeFlips: 0,
    joinDate: new Date().toISOString()
  },
  {
    id: 1234567890,
    username: 'user1',
    firstName: 'John',
    lastName: 'Doe',
    balance: 5.5,
    totalEarned: 8.0,
    referrals: 2,
    isNewUser: true,
    hasWelcomeBonus: false,
    freeFlips: 3,
    joinDate: new Date(Date.now() - 86400000).toISOString()
  }
];

const dummyRequests: Request[] = [
  {
    id: 1,
    userId: 7609121993,
    user: 'admin',
    type: 'deposit',
    amount: 5.0,
    status: 'approved'
  },
  {
    id: 2,
    userId: 7609121993,
    user: 'admin',
    type: 'withdraw',
    amount: 2.0,
    status: 'pending'
  },
  {
    id: 3,
    userId: 1234567890,
    user: 'user1',
    type: 'deposit',
    amount: 3.0,
    status: 'pending'
  }
];

const dummyStats: Stats = {
  totalUsers: 2,
  totalRequests: 3,
  pendingRequests: 2,
  totalDeposits: 5.0,
  totalWithdrawals: 0
};

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api';

const Admin: React.FC<AdminProps> = ({ isAdmin, user }) => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [useDummyData, setUseDummyData] = useState(false);
  const [activeTab, setActiveTab] = useState<'requests' | 'users' | 'stats'>('requests');

  // Fetch data from backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const [requestsRes, usersRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/requests`),
        fetch(`${API_URL}/users`),
        fetch(`${API_URL}/stats`)
      ]);
      
      if (requestsRes.ok && usersRes.ok && statsRes.ok) {
        const requestsData = await requestsRes.json();
        const usersData = await usersRes.json();
        const statsData = await statsRes.json();
        
        setRequests(requestsData);
        setUsers(usersData);
        setStats(statsData);
        setUseDummyData(false);
      } else {
        throw new Error('Backend not available');
      }
    } catch (error) {
      console.error('Error fetching data, using dummy data:', error);
      setRequests(dummyRequests);
      setUsers(dummyUsers);
      setStats(dummyStats);
      setUseDummyData(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  // Approve/Reject
  const handleAction = async (id: number, action: 'approved' | 'rejected') => {
    try {
      if (!useDummyData) {
        await fetch(`${API_URL}/requests/${id}/${action}`, { method: 'POST' });
        fetchData(); // refresh data
      } else {
        // Update dummy data
        setRequests(prev => prev.map(req => 
          req.id === id ? { ...req, status: action } : req
        ));
        // Update stats
        setStats(prev => prev ? {
          ...prev,
          pendingRequests: prev.pendingRequests - 1
        } : null);
      }
    } catch (error) {
      console.error('Error handling action:', error);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // If not admin, show access denied
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
        {useDummyData && (
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
            <p className="text-yellow-400 text-sm">⚠️ Using demo data (Backend not available)</p>
          </div>
        )}
        {user && (
          <div className="bg-dark-bg p-3 rounded-lg">
            <p className="text-sm text-white/50">Logged in as: @{user.username || 'N/A'}</p>
            <p className="text-sm text-white/50">User ID: {user.id}</p>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'requests'
              ? 'bg-coin-gold text-black'
              : 'bg-dark-card text-white/70 hover:text-white'
          }`}
        >
          📋 Requests
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'users'
              ? 'bg-coin-gold text-black'
              : 'bg-dark-card text-white/70 hover:text-white'
          }`}
        >
          👥 Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'stats'
              ? 'bg-coin-gold text-black'
              : 'bg-dark-card text-white/70 hover:text-white'
          }`}
        >
          📊 Stats
        </button>
      </div>

      {/* Requests Tab */}
      {activeTab === 'requests' && (
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
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">👥 Registered Users</h2>
          
          {users.length === 0 ? (
            <div className="bg-dark-card p-6 rounded-xl border border-dark-border text-center">
              <p className="text-white/70">Belum ada user yang terdaftar</p>
            </div>
          ) : (
            users.map(user => (
              <div key={user.id} className="bg-dark-card p-4 rounded-xl border border-dark-border">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-white">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-sm text-white/70">@{user.username}</div>
                    <div className="text-xs text-white/50">ID: {user.id}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-coin-gold">{user.balance} TON</div>
                    <div className="text-xs text-white/50">Balance</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-dark-bg p-2 rounded">
                    <div className="text-white/70">Total Earned</div>
                    <div className="text-white font-medium">{user.totalEarned} TON</div>
                  </div>
                  <div className="bg-dark-bg p-2 rounded">
                    <div className="text-white/70">Referrals</div>
                    <div className="text-white font-medium">{user.referrals}</div>
                  </div>
                  <div className="bg-dark-bg p-2 rounded">
                    <div className="text-white/70">Free Flips</div>
                    <div className="text-white font-medium">{user.freeFlips}</div>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-white/50">
                  Joined: {formatDate(user.joinDate)}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && stats && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-4">📊 Platform Statistics</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-dark-card p-4 rounded-xl border border-dark-border text-center">
              <div className="text-2xl font-bold text-coin-gold">{stats.totalUsers}</div>
              <div className="text-sm text-white/70">Total Users</div>
            </div>
            <div className="bg-dark-card p-4 rounded-xl border border-dark-border text-center">
              <div className="text-2xl font-bold text-green-400">{stats.totalRequests}</div>
              <div className="text-sm text-white/70">Total Requests</div>
            </div>
            <div className="bg-dark-card p-4 rounded-xl border border-dark-border text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.pendingRequests}</div>
              <div className="text-sm text-white/70">Pending Requests</div>
            </div>
            <div className="bg-dark-card p-4 rounded-xl border border-dark-border text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.totalDeposits}</div>
              <div className="text-sm text-white/70">Total Deposits</div>
            </div>
          </div>
          
          <div className="bg-dark-card p-4 rounded-xl border border-dark-border">
            <div className="text-lg font-semibold text-white mb-2">💰 Financial Summary</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/70">Total Deposits:</span>
                <span className="text-green-400 font-medium">{stats.totalDeposits} TON</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Total Withdrawals:</span>
                <span className="text-red-400 font-medium">{stats.totalWithdrawals} TON</span>
              </div>
              <div className="border-t border-dark-border pt-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Net Flow:</span>
                  <span className={`font-medium ${stats.totalDeposits - stats.totalWithdrawals >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stats.totalDeposits - stats.totalWithdrawals} TON
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;