import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PlanCard from '../components/PlanCard'
import PaymentModal from '../components/PaymentModal'
import Receipt from '../components/Receipt'
import { AuthContext } from '../context/AuthContext'
import { rechargeAPI } from '../services/api'

const OPERATORS = [
  { id: 'airtel', name: 'Airtel', color: 'from-red-500 to-red-600' },
  { id: 'jio', name: 'Jio', color: 'from-blue-500 to-blue-600' },
  { id: 'vi', name: 'Vi', color: 'from-purple-500 to-purple-600' },
  { id: 'bsnl', name: 'BSNL', color: 'from-yellow-500 to-orange-600' }
]

const PLANS_BY_OPERATOR = {
  airtel: [
    { id: 'a1', type: 'prepaid', price: 155, validity: '28 days', data: '1GB/day', description: 'Airtel basic plan' },
    { id: 'a2', type: 'prepaid', price: 209, validity: '28 days', data: '1.5GB/day', description: 'Airtel popular plan' },
    { id: 'a3', type: 'prepaid', price: 299, validity: '28 days', data: '2GB/day', description: 'Airtel unlimited' },
    { id: 'a4', type: 'prepaid', price: 479, validity: '56 days', data: '1.5GB/day', description: 'Airtel long validity' },
    { id: 'a5', type: 'postpaid', price: 499, validity: '30 days', data: '40GB', description: 'Airtel postpaid' }
  ],
  jio: [
    { id: 'j1', type: 'prepaid', price: 149, validity: '28 days', data: '1GB/day', description: 'Jio basic plan' },
    { id: 'j2', type: 'prepaid', price: 199, validity: '28 days', data: '1.5GB/day', description: 'Jio popular plan' },
    { id: 'j3', type: 'prepaid', price: 299, validity: '28 days', data: '2GB/day', description: 'Jio unlimited' },
    { id: 'j4', type: 'prepaid', price: 533, validity: '56 days', data: '2GB/day', description: 'Jio long validity' },
    { id: 'j5', type: 'postpaid', price: 399, validity: '30 days', data: '30GB', description: 'Jio postpaid' }
  ],
  vi: [
    { id: 'v1', type: 'prepaid', price: 155, validity: '28 days', data: '1GB/day', description: 'Vi basic plan' },
    { id: 'v2', type: 'prepaid', price: 209, validity: '28 days', data: '1.5GB/day', description: 'Vi popular plan' },
    { id: 'v3', type: 'prepaid', price: 299, validity: '28 days', data: '2GB/day', description: 'Vi unlimited' },
    { id: 'v4', type: 'prepaid', price: 475, validity: '56 days', data: '1.5GB/day', description: 'Vi long validity' },
    { id: 'v5', type: 'postpaid', price: 499, validity: '30 days', data: '40GB', description: 'Vi postpaid' }
  ],
  bsnl: [
    { id: 'b1', type: 'prepaid', price: 107, validity: '28 days', data: '1GB/day', description: 'BSNL basic plan' },
    { id: 'b2', type: 'prepaid', price: 187, validity: '28 days', data: '2GB/day', description: 'BSNL popular plan' },
    { id: 'b3', type: 'prepaid', price: 297, validity: '54 days', data: '2GB/day', description: 'BSNL unlimited' },
    { id: 'b4', type: 'prepaid', price: 397, validity: '80 days', data: '2GB/day', description: 'BSNL long validity' },
    { id: 'b5', type: 'postpaid', price: 399, validity: '30 days', data: '30GB', description: 'BSNL postpaid' }
  ]
}

export default function RechargePlans(){
  const [selectedOperator, setSelectedOperator] = useState(null)
  const [filter, setFilter] = useState('all')
  const [mobileNumber, setMobileNumber] = useState('')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showReceipt, setShowReceipt] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [rechargeData, setRechargeData] = useState(null)
  const { user, isLoggedIn } = useContext(AuthContext || {})
  const navigate = useNavigate()

  const plans = selectedOperator ? PLANS_BY_OPERATOR[selectedOperator] : []
  const filteredPlans = plans.filter(plan => filter === 'all' || plan.type === filter)

  function handleSelect(plan){
    if(!isLoggedIn){
      alert('⚠️ Please login to recharge')
      navigate('/login')
      return
    }
    
    if(!mobileNumber || mobileNumber.length !== 10){
      alert('⚠️ Please enter a valid 10-digit mobile number')
      return
    }
    
    if(!selectedOperator){
      alert('⚠️ Please select an operator')
      return
    }
    
    setSelectedPlan(plan)
    setShowPaymentModal(true)
  }

  async function handlePaymentConfirm(paymentMethod){
    try {
      const data = await rechargeAPI.create({
        mobileNumber,
        operator: selectedOperator,
        plan: selectedPlan,
        paymentMethod
      })
      
      if(data.error){
        alert('⚠️ ' + data.error)
        setShowPaymentModal(false)
      } else {
        setRechargeData(data.recharge)
        setShowPaymentModal(false)
        setShowReceipt(true)
      }
    } catch (err) {
      alert('⚠️ Server error. Please try again.')
      setShowPaymentModal(false)
    }
  }

  return (
    <>
      {showPaymentModal && (
        <PaymentModal
          plan={selectedPlan}
          mobileNumber={mobileNumber}
          operator={selectedOperator}
          onConfirm={handlePaymentConfirm}
          onCancel={() => setShowPaymentModal(false)}
        />
      )}
      
      {showReceipt && rechargeData && (
        <Receipt
          recharge={rechargeData}
          onClose={() => setShowReceipt(false)}
        />
      )}
      
      <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl animate-gradient">
        <h1 className="text-3xl font-bold mb-2">Mobile Recharge</h1>
        <p className="text-blue-100">Enter number, select operator and choose plan</p>
      </div>
      
      {/* Mobile Number Input */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-100">
        <label className="block text-sm font-bold text-gray-700 mb-3">Mobile Number</label>
        <input 
          type="tel"
          value={mobileNumber}
          onChange={e => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
          placeholder="Enter 10-digit mobile number"
          className="w-full px-5 py-4 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 text-xl font-bold transition-all"
          maxLength="10"
        />
        {mobileNumber && mobileNumber.length === 10 && (
          <p className="mt-3 text-green-600 text-sm font-bold animate-fade-in">Valid mobile number</p>
        )}
      </div>
      
      {/* Operator Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-purple-100">
        <label className="block text-sm font-bold text-gray-700 mb-4">Select Operator</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {OPERATORS.map(operator => (
            <button
              key={operator.id}
              onClick={() => setSelectedOperator(operator.id)}
              className={`p-6 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 ${
                selectedOperator === operator.id
                  ? `bg-gradient-to-br ${operator.color} text-white shadow-2xl scale-105 ring-4 ring-purple-200`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md'
              }`}
            >
              {operator.name}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Section */}
      {selectedOperator ? (
        <div className="space-y-4 animate-fade-in">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-5 shadow-xl border-2 border-purple-100">
            <div className="flex gap-3 flex-wrap">
              {['all', 'prepaid', 'postpaid'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                    filter === type
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'all' ? 'All Plans' : type === 'prepaid' ? 'Prepaid' : 'Postpaid'}
                </button>
              ))}
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan, index) => (
              <div key={plan.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PlanCard plan={plan} onSelect={handleSelect} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-12 text-center shadow-xl border-2 border-purple-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Select an Operator</h3>
          <p className="text-gray-600">Choose your mobile operator to view available plans</p>
        </div>
      )}
    </div>
    </>
  )
}
