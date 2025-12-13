import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RechargePlans from "./pages/RechargePlans";

// Import both AuthProvider (default) and AuthContext (named export) from AuthContext.jsx
import AuthProvider, { AuthContext } from "./context/AuthContext";

/**
 * ProtectedRoute: redirects to /login when not logged in
 */
function ProtectedRoute({ children }) {
  const { isLoggedIn } = React.useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function DashboardContent() {
  const { user } = React.useContext(AuthContext);
  const [recharges, setRecharges] = React.useState([]);
  const [stats, setStats] = React.useState({ totalSpent: 0, totalRecharges: 0, latestPlan: null });
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [rechargeData, statsData] = await Promise.all([
          fetch('http://localhost:3000/api/recharge', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          }).then(r => r.json()),
          fetch('http://localhost:3000/api/recharge/stats', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          }).then(r => r.json())
        ]);
        
        setRecharges(rechargeData.recharges || []);
        setStats(statsData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    
    if(user) fetchData();
  }, [user]);
  
  const totalSpent = stats.totalSpent;
  const latestPlan = stats.latestPlan;
  
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl p-6 text-white shadow-xl animate-gradient">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
        <p className="text-blue-100">Here's your recharge overview</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center animate-pulse-slow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Spent</h3>
              <p className="text-2xl font-bold text-gray-900">₹{totalSpent}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center animate-pulse-slow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Recharges</h3>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRecharges}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center animate-pulse-slow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Latest Plan</h3>
              <p className="text-2xl font-bold text-gray-900">{latestPlan ? `₹${latestPlan.price}` : 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Recharges</h2>
          <Link to="/plans" className="text-purple-600 hover:text-purple-700 font-semibold text-sm">
            + New Recharge
          </Link>
        </div>
        {recharges.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No recharges yet</p>
            <Link to="/plans" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all inline-block">
              Recharge Now
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recharges.slice(0, 5).map(recharge => (
              <div key={recharge.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{recharge.mobileNumber}</p>
                    <p className="text-xs text-gray-600">₹{recharge.plan.price} • {recharge.plan.data} • {new Date(recharge.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className="text-green-600 text-sm font-semibold">✓ Success</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
          <Navbar />
          <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/plans" element={<RechargePlans />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardContent />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={
                <div className="text-center py-12 bg-white rounded-xl shadow-md">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
                  <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                  <a href="/" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-md inline-block">
                    Go Home
                  </a>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
