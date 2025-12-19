import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

export default function AdminPlans() {
  const { admin, isAdminLoggedIn, adminLogout } = useContext(AdminContext);
  const [plans, setPlans] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    operator: 'airtel',
    type: 'prepaid',
    price: '',
    validity: '',
    data: '',
    description: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
      return;
    }
    fetchPlans();
  }, [isAdminLoggedIn]);

  async function fetchPlans() {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch('http://localhost:3000/api/admin/plans', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setPlans(data.plans);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    try {
      if (editingPlan) {
        await fetch(`http://localhost:3000/api/admin/plans/${editingPlan.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        alert('Plan updated successfully!');
      } else {
        await fetch('http://localhost:3000/api/admin/plans', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        alert('Plan added successfully!');
      }
      
      setShowAddModal(false);
      setEditingPlan(null);
      setFormData({ operator: 'airtel', type: 'prepaid', price: '', validity: '', data: '', description: '' });
      fetchPlans();
    } catch (err) {
      alert('Error saving plan');
    }
  }

  async function handleDelete(planId) {
    if (!confirm('Are you sure you want to delete this plan?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`http://localhost:3000/api/admin/plans/${planId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      alert('Plan deleted successfully!');
      fetchPlans();
    } catch (err) {
      alert('Error deleting plan');
    }
  }

  function handleEdit(plan) {
    setEditingPlan(plan);
    setFormData({
      operator: plan.operator,
      type: plan.type,
      price: plan.price,
      validity: plan.validity,
      data: plan.data,
      description: plan.description
    });
    setShowAddModal(true);
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Plan Management</h1>
                <p className="text-sm text-purple-100">{admin?.name}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link to="/admin/dashboard" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-all">
                Dashboard
              </Link>
              <button onClick={adminLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition-all">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Plans ({plans.length})</h2>
          <button
            onClick={() => {
              setEditingPlan(null);
              setFormData({ operator: 'airtel', type: 'prepaid', price: '', validity: '', data: '', description: '' });
              setShowAddModal(true);
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            + Add New Plan
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan._id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {plan.operator}
                  </span>
                  <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase ml-2">
                    {plan.type}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-3xl font-bold text-gray-900">₹{plan.price}</p>
                <p className="text-sm text-gray-600">{plan.validity}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-lg font-semibold text-gray-900">{plan.data}</p>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(plan)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {editingPlan ? 'Edit Plan' : 'Add New Plan'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Operator</label>
                  <select
                    value={formData.operator}
                    onChange={e => setFormData({ ...formData, operator: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="airtel">Airtel</option>
                    <option value="jio">Jio</option>
                    <option value="vi">Vi</option>
                    <option value="bsnl">BSNL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="prepaid">Prepaid</option>
                    <option value="postpaid">Postpaid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Validity</label>
                  <input
                    type="text"
                    value={formData.validity}
                    onChange={e => setFormData({ ...formData, validity: e.target.value })}
                    placeholder="e.g., 28 days"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Data</label>
                  <input
                    type="text"
                    value={formData.data}
                    onChange={e => setFormData({ ...formData, data: e.target.value })}
                    placeholder="e.g., 1.5GB/day"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="e.g., Popular plan"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingPlan(null);
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    {editingPlan ? 'Update' : 'Add'} Plan
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}