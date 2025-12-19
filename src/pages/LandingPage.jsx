import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage(){
  const [reviews, setReviews] = useState([])
  const [stats] = useState({
    users: '50K+',
    recharges: '2M+',
    satisfaction: '98%'
  })

  useEffect(() => {
    fetch('http://localhost:3000/api/reviews')
      .then(r => r.json())
      .then(data => setReviews(data.reviews || []))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="p-12 md:p-16">
            <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Trusted by 50,000+ Users
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
              Mobile Recharge
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Instant recharges for all major operators. Fast, secure, and reliable service at your fingertips.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/plans" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105">
                Get Started
              </Link>
              <Link to="/signup" className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-purple-600 hover:text-purple-600 transition-all">
                Create Account
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex gap-6 mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">Instant Process</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative h-full min-h-[500px] bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-8">
            <div className="relative w-full max-w-md">
              {/* Phone Mockup SVG */}
              <svg viewBox="0 0 300 600" className="w-full drop-shadow-2xl">
                {/* Phone Frame */}
                <rect x="10" y="10" width="280" height="580" rx="30" fill="#1f2937" />
                <rect x="20" y="20" width="260" height="560" rx="25" fill="#111827" />
                
                {/* Screen */}
                <rect x="30" y="80" width="240" height="480" rx="15" fill="white" />
                
                {/* App UI */}
                <rect x="40" y="90" width="220" height="60" rx="10" fill="url(#gradient1)" />
                <text x="150" y="125" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">RechargePro</text>
                
                {/* Operator Cards */}
                <rect x="40" y="170" width="100" height="80" rx="10" fill="#ef4444" opacity="0.9" />
                <rect x="150" y="170" width="100" height="80" rx="10" fill="#3b82f6" opacity="0.9" />
                <rect x="40" y="260" width="100" height="80" rx="10" fill="#8b5cf6" opacity="0.9" />
                <rect x="150" y="260" width="100" height="80" rx="10" fill="#f59e0b" opacity="0.9" />
                
                {/* Plan Cards */}
                <rect x="40" y="360" width="220" height="70" rx="10" fill="#f3f4f6" />
                <rect x="50" y="370" width="60" height="50" rx="8" fill="#a855f7" />
                <rect x="120" y="375" width="120" height="8" rx="4" fill="#d1d5db" />
                <rect x="120" y="395" width="80" height="8" rx="4" fill="#d1d5db" />
                
                <rect x="40" y="445" width="220" height="70" rx="10" fill="#f3f4f6" />
                <rect x="50" y="455" width="60" height="50" rx="8" fill="#ec4899" />
                <rect x="120" y="460" width="120" height="8" rx="4" fill="#d1d5db" />
                <rect x="120" y="480" width="80" height="8" rx="4" fill="#d1d5db" />
                
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9333ea" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white text-center transform hover:scale-105 transition-all shadow-xl animate-fade-in">
          <div className="text-5xl font-bold mb-2 animate-pulse-slow">{stats.users}</div>
          <div className="text-purple-100 font-semibold">Happy Users</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-8 text-white text-center transform hover:scale-105 transition-all shadow-xl animate-fade-in">
          <div className="text-5xl font-bold mb-2 animate-pulse-slow">{stats.recharges}</div>
          <div className="text-pink-100 font-semibold">Recharges Done</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white text-center transform hover:scale-105 transition-all shadow-xl animate-fade-in">
          <div className="text-5xl font-bold mb-2 animate-pulse-slow">{stats.satisfaction}</div>
          <div className="text-blue-100 font-semibold">Satisfaction Rate</div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose Us</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4 animate-pulse-slow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Lightning Fast</h3>
            <p className="text-sm text-gray-600">Recharge completed in under 10 seconds</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-4 animate-pulse-slow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">100% Secure</h3>
            <p className="text-sm text-gray-600">Bank-grade encryption & secure payments</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 animate-pulse-slow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Best Offers</h3>
            <p className="text-sm text-gray-600">Exclusive cashback & reward deals</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-fade-in">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4 animate-pulse-slow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">24/7 Support</h3>
            <p className="text-sm text-gray-600">Round the clock customer assistance</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">What Our Customers Say</h2>
          <p className="text-center text-gray-600 mb-8">Real reviews from real users</p>
          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-scroll-left">
              {reviews.map((review, index) => (
                <div key={review._id} className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-100 hover:border-purple-300 transition-all animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{review.userName}</h4>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{review.comment}"</p>
                  <p className="text-xs text-gray-500 mt-3">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-12 text-white text-center shadow-2xl animate-gradient">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Join millions of users and experience the fastest recharge service in India!</p>
        <Link to="/signup" className="inline-block bg-white text-purple-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl transform hover:scale-105">
          Create Free Account
        </Link>
      </section>
    </div>
  )
}

// Add CSS for scrolling animation
const style = document.createElement('style')
style.textContent = `
  @keyframes scroll-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-scroll-left {
    animation: scroll-left 30s linear infinite;
  }
  .animate-scroll-left:hover {
    animation-play-state: paused;
  }
`
document.head.appendChild(style)
