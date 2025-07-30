const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory data storage (replace with database in production)
let users = [
  {
    id: 7609121993,
    username: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    balance: 10.0,
    totalEarned: 15.0,
    referrals: [],
    isNewUser: false,
    hasWelcomeBonus: true,
    freeFlips: 0,
    joinDate: new Date().toISOString()
  }
];

let requests = [
  {
    id: 1,
    userId: 7609121993,
    user: 'admin',
    type: 'deposit',
    amount: 5.0,
    status: 'approved',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    userId: 7609121993,
    user: 'admin',
    type: 'withdraw',
    amount: 2.0,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];

// Helper function to get user by ID
const getUserById = (id) => {
  return users.find(user => user.id === id);
};

// Helper function to get user by username
const getUserByUsername = (username) => {
  return users.find(user => user.username === username);
};

// Routes

// Get all users (admin only)
app.get('/api/users', (req, res) => {
  try {
    const userList = users.map(user => ({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      balance: user.balance,
      totalEarned: user.totalEarned,
      referrals: user.referrals.length,
      isNewUser: user.isNewUser,
      hasWelcomeBonus: user.hasWelcomeBonus,
      freeFlips: user.freeFlips,
      joinDate: user.joinDate
    }));
    
    res.json(userList);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new user
app.post('/api/users', (req, res) => {
  try {
    const { id, username, firstName, lastName } = req.body;
    
    // Check if user already exists
    if (getUserById(id)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const newUser = {
      id: parseInt(id),
      username: username || `user_${id}`,
      firstName: firstName || 'User',
      lastName: lastName || '',
      balance: 0.0,
      totalEarned: 0.0,
      referrals: [],
      isNewUser: true,
      hasWelcomeBonus: false,
      freeFlips: 3,
      joinDate: new Date().toISOString()
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user
app.put('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json(users[userIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all requests
app.get('/api/requests', (req, res) => {
  try {
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new request
app.post('/api/requests', (req, res) => {
  try {
    const { userId, user, type, amount } = req.body;
    
    const newRequest = {
      id: requests.length + 1,
      userId: parseInt(userId),
      user: user,
      type: type,
      amount: parseFloat(amount),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    requests.push(newRequest);
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update request status
app.post('/api/requests/:id/:action', (req, res) => {
  try {
    const requestId = parseInt(req.params.id);
    const action = req.params.action;
    
    const requestIndex = requests.findIndex(req => req.id === requestId);
    
    if (requestIndex === -1) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    if (action !== 'approved' && action !== 'rejected') {
      return res.status(400).json({ error: 'Invalid action' });
    }
    
    requests[requestIndex].status = action;
    
    // If approved, update user balance
    if (action === 'approved') {
      const request = requests[requestIndex];
      const user = getUserById(request.userId);
      
      if (user) {
        if (request.type === 'deposit') {
          user.balance += request.amount;
        } else if (request.type === 'withdraw') {
          user.balance -= request.amount;
        }
      }
    }
    
    res.json(requests[requestIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get statistics
app.get('/api/stats', (req, res) => {
  try {
    const totalUsers = users.length;
    const totalRequests = requests.length;
    const pendingRequests = requests.filter(req => req.status === 'pending').length;
    const totalDeposits = requests
      .filter(req => req.type === 'deposit' && req.status === 'approved')
      .reduce((sum, req) => sum + req.amount, 0);
    const totalWithdrawals = requests
      .filter(req => req.type === 'withdraw' && req.status === 'approved')
      .reduce((sum, req) => sum + req.amount, 0);
    
    res.json({
      totalUsers,
      totalRequests,
      pendingRequests,
      totalDeposits,
      totalWithdrawals
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Admin Dashboard: http://localhost:${PORT}/api/users`);
  console.log(`📋 Requests: http://localhost:${PORT}/api/requests`);
  console.log(`📈 Stats: http://localhost:${PORT}/api/stats`);
}); 