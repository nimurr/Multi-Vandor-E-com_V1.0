import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const API_BASE = '/api';

function Dashboard() {
  const [data, setData] = useState({ store: null, subscription: null });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${API_BASE}/vendor/dashboard`);
      setData(res.data);
    } catch (err) {
      alert(err.response.data.msg || 'Error');
    }
  };

  const handleRequestStore = () => {
    navigate('/store-request');
  };

  return (
    <div>
      <h1>Vendor Dashboard</h1>
      <p>Store Status: {data.store ? data.store.status : 'No store'}</p>
      <p>Subscription: {data.subscription ? `${data.subscription.status} until ${data.subscription.endDate}` : 'No sub'}</p>
      {!data.store && <button onClick={handleRequestStore}>Request Store</button>}
    </div>
  );
}

function StoreRequest() {
  const [formData, setFormData] = useState({ domain: '', dnsConfig: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/vendor/store/request', formData);
      alert('Store request submitted!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Request Store</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Custom Domain (e.g. mystore.com)" onChange={(e) => setFormData({...formData, domain: e.target.value})} />
        <textarea placeholder="DNS Config" onChange={(e) => setFormData({...formData, dnsConfig: e.target.value})}></textarea>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/store-request" element={<StoreRequest />} />
          <Route path="/" element={<div>Redirecting to dashboard...</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
