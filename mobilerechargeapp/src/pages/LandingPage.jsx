import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage(){
  const [reviews, setReviews] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [stats] = useState({
    users: '50K+',
    recharges: '2M+',
    satisfaction: '98%'
  })

  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1200&q=80',
      title: 'Fast & Secure Recharges',
      subtitle: 'Recharge your mobile in seconds'
    },
    {
      url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
      title: 'All Operators Supported',
      subtitle: 'Airtel, Jio, Vi, BSNL & more'
    },
    {
      url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
      title: 'Best Offers & Cashback',
      subtitle: 'Save more on every recharge'
    },
    {
      url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80',
      title: '24/7 Customer Support',
      subtitle: 'We are always here to help'
    }
  ]

  useEffect(() => {
    fetch('http://localhost:3000/api/reviews')
      .then(r => r.json())
      .then(data => setReviews(data.reviews || []))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-16">
      {/* Hero Slider Section */}
      <section className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={image.url} 
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-8 w-full">
                <div className="max-w-2xl">
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    {image.title}
                  </h1>
                  <p className="text-2xl text-gray-200 mb-8">
                    {image.subtitle}
                  </p>
                  <div className="flex gap-4">
                    <Link 
                      to="/plans" 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
                    >
                      Recharge Now
                    </Link>
                    <Link 
                      to="/signup" 
                      className="bg-white/20 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all"
                    >
                      Sign Up Free
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-12 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroImages.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Trust Badges */}
      <section className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900">100% Secure</div>
              <div className="text-sm text-gray-600">SSL Encrypted</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900">Instant Process</div>
              <div className="text-sm text-gray-600">Under 10 seconds</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900">50K+ Users</div>
              <div className="text-sm text-gray-600">Trusted Platform</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900">24/7 Support</div>
              <div className="text-sm text-gray-600">Always Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-10 text-white text-center shadow-xl hover:shadow-2xl transition-all">
          <div className="text-6xl font-bold mb-3">{stats.users}</div>
          <div className="text-xl text-purple-100">Happy Customers</div>
        </div>
        <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl p-10 text-white text-center shadow-xl hover:shadow-2xl transition-all">
          <div className="text-6xl font-bold mb-3">{stats.recharges}</div>
          <div className="text-xl text-pink-100">Successful Recharges</div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-white text-center shadow-xl hover:shadow-2xl transition-all">
          <div className="text-6xl font-bold mb-3">{stats.satisfaction}</div>
          <div className="text-xl text-blue-100">Customer Satisfaction</div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Why Choose RechargePro</h2>
        <p className="text-center text-gray-600 text-lg mb-12">Experience the best mobile recharge service in India</p>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Lightning Fast</h3>
            <p className="text-gray-600">Instant recharge processing in under 10 seconds with real-time confirmation</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-3 text-xl">100% Secure</h3>
            <p className="text-gray-600">Bank-grade encryption and secure payment gateway for safe transactions</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-3 text-xl">Best Offers</h3>
            <p className="text-gray-600">Exclusive cashback deals and reward points on every recharge</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900 mb-3 text-xl">24/7 Support</h3>
            <p className="text-gray-600">Round-the-clock customer support via chat, email, and phone</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section>
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Customer Reviews</h2>
          <p className="text-center text-gray-600 text-lg mb-12">See what our customers are saying</p>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 6).map((review) => (
              <div key={review._id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{review.userName}</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">"{review.comment}"</p>
                <p className="text-sm text-gray-500 mt-4">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80" 
          alt="Join Now"
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-200 mb-8">Join 50,000+ satisfied customers and experience hassle-free mobile recharges today!</p>
            <Link 
              to="/signup" 
              className="inline-block bg-white text-purple-600 px-12 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
