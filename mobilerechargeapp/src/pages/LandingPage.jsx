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
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-12 md:p-16 text-white shadow-2xl overflow-hidden animate-gradient">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
            India's #1 Recharge Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Instant Mobile Recharge
            <span className="block text-yellow-300">In Just 10 Seconds!</span>
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Fast, secure and hassle-free recharges for all networks. Join millions of happy customers
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/plans" className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl transform hover:scale-105">
              Recharge Now
            </Link>
            <Link to="/signup" className="bg-purple-700/50 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-800/50 transition-all transform hover:scale-105">
              Sign Up Free
            </Link>
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
