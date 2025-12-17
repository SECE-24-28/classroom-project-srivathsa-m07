import React from 'react'

export default function PlanCard({ plan = {}, onSelect = () => {} }){
  const isPopular = plan.price === 299;
  const isPrepaid = plan.type === 'prepaid';
  
  return (
    <div className={`relative bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all ${
      isPopular ? 'ring-2 ring-orange-400' : ''
    }`}>
      {isPopular && (
        <div className="absolute -top-2 -right-2">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ POPULAR
          </span>
        </div>
      )}
      
      <div className="mb-3">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
          isPrepaid 
            ? 'bg-green-100 text-green-700' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          {plan.type?.toUpperCase()}
        </span>
      </div>
      
      <h3 className="text-3xl font-bold text-gray-900 mb-1">₹{plan.price}</h3>
      <p className="text-sm text-gray-500 mb-4">{plan.validity}</p>
      
      <div className={`rounded-lg p-3 mb-4 ${
        isPrepaid ? 'bg-green-50' : 'bg-blue-50'
      }`}>
        <div className="flex items-center justify-center gap-2">
          <svg className={`w-5 h-5 ${
            isPrepaid ? 'text-green-600' : 'text-blue-600'
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-lg font-bold text-gray-900">{plan.data}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-xs text-gray-600">
          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Unlimited Calls
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          100 SMS/day
        </div>
      </div>
      
      <button 
        onClick={() => onSelect(plan)} 
        className={`w-full py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg ${
          isPrepaid
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
            : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
        }`}
      >
        Recharge Now
      </button>
    </div>
  )
}
