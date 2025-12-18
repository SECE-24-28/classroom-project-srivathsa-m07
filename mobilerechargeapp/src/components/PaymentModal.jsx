import React, { useState } from 'react';

const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', color: 'from-green-500 to-emerald-600' },
  { id: 'card', name: 'Credit/Debit Card', color: 'from-blue-500 to-indigo-600' },
  { id: 'netbanking', name: 'Net Banking', color: 'from-indigo-500 to-purple-600' },
  { id: 'wallet', name: 'Wallet', color: 'from-orange-500 to-red-600' }
];

export default function PaymentModal({ plan, mobileNumber, operator, onConfirm, onCancel }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handlePay = async () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }

    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      onConfirm(selectedMethod);
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold mb-2">Complete Payment</h2>
          <p className="text-blue-100 text-sm">Choose your payment method</p>
        </div>

        {/* Plan Summary */}
        <div className="p-6 border-b border-gray-100">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Mobile Number</span>
              <span className="font-bold text-gray-900">{mobileNumber}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Operator</span>
              <span className="font-bold text-gray-900 capitalize">{operator}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">Plan</span>
              <span className="font-bold text-gray-900">{plan.data} • {plan.validity}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-purple-200">
              <span className="text-gray-900 font-semibold">Amount to Pay</span>
              <span className="text-2xl font-bold text-purple-600">₹{plan.price}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6">
          <h3 className="font-bold text-gray-900 mb-4">Select Payment Method</h3>
          <div className="space-y-3">
            {PAYMENT_METHODS.map(method => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all transform hover:scale-102 ${
                  selectedMethod === method.id
                    ? `bg-gradient-to-r ${method.color} text-white border-transparent shadow-lg`
                    : 'bg-white border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-bold ${selectedMethod === method.id ? 'text-white' : 'text-gray-900'}`}>
                    {method.name}
                  </span>
                  {selectedMethod === method.id && (
                    <svg className="w-6 h-6 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onCancel}
              disabled={processing}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePay}
              disabled={processing || !selectedMethod}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>Pay ₹{plan.price}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
