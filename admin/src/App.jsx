import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const API_BASE = '/api';

function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Admin login required');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/stores/requests`);
      setRequests(res.data);
    } catch (err) {
      alert('Admin access required or error');
    }
  };

  const approveStore = async (id) => {
    try {
      await axios.post(`${API_BASE}/admin/stores/${id}/approve`);
      alert('Store approved & deployed!');
      fetchRequests();
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Pending Store Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Business</th>
            <th>Domain</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((store) => (
            <tr key={store._id}>
              <td>{store.vendorId?.businessName}</td>
              <td>{store.domain}</td>
              <td>{store.status}</td>
              <td><button onClick={() => approveStore(store._id)}>Approve & Deploy</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
