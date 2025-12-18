import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Receipt({ recharge, onClose }) {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleDone = () => {
    onClose();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-slide-up print:shadow-none">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-2xl text-center print:bg-green-600">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Recharge Successful</h2>
          <p className="text-green-100 text-sm mt-1">Your recharge has been completed successfully</p>
        </div>

        {/* Receipt Details */}
        <div className="p-6 space-y-4">
          <div className="text-center pb-4 border-b-2 border-dashed border-gray-300">
            <p className="text-gray-600 text-sm mb-1">Transaction ID</p>
            <p className="text-lg font-bold text-gray-900">{recharge.transactionId}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Mobile Number</span>
              <span className="font-bold text-gray-900">{recharge.mobileNumber}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Operator</span>
              <span className="font-bold text-gray-900 capitalize">{recharge.operator}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Plan Type</span>
              <span className="font-bold text-gray-900 capitalize">{recharge.plan.type}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Data</span>
              <span className="font-bold text-gray-900">{recharge.plan.data}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Validity</span>
              <span className="font-bold text-gray-900">{recharge.plan.validity}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-bold text-gray-900">{recharge.paymentMethod}</span>
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200">
              <span className="text-gray-600">Date & Time</span>
              <span className="font-semibold text-gray-900 text-sm">
                {new Date(recharge.date).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Amount */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 text-center">
            <p className="text-gray-600 text-sm mb-1">Amount Paid</p>
            <p className="text-3xl font-bold text-purple-600">₹{recharge.plan.price}</p>
          </div>

          {/* Status */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 text-center">
            <p className="text-green-700 font-bold">Payment Successful</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Receipt
            </button>
            <button
              onClick={handleDone}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Done
            </button>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-gray-500 pt-2">
            <p>Thank you for using our service</p>
            <p className="mt-1">For support contact: support@rechargepro.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
