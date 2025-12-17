import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage(){
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl animate-gradient">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Instant Mobile Recharge
          </h1>
          <p className="text-lg mb-6 text-blue-100">
            Fast, secure & hassle-free recharges for all networks
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/plans" className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg">
              Browse Plans
            </Link>
            <Link to="/signup" className="bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-800 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Instant Recharge</h3>
          <p className="text-sm text-gray-600">Recharge completed in seconds</p>
        </div>
        
        <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 mb-1">100% Secure</h3>
          <p className="text-sm text-gray-600">Bank-grade encryption</p>
        </div>
        
        <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Best Offers</h3>
          <p className="text-sm text-gray-600">Exclusive cashback deals</p>
        </div>
      </section>

      {/* Quick Recharge */}
      <section className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Recharge</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="tel" placeholder="Enter mobile number" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
          <Link to="/plans" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-purple-700 hover:to-blue-700 transition-all">
            View Plans
          </Link>
        </div>
      </section>
    </div>
  )
}
