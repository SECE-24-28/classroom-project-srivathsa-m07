import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">R</span>
            </div>
            <span className="font-bold text-xl">RechargePro</span>
          </div>
          <p className="text-blue-200 text-sm mb-4">
            Fast, Secure & Hassle-free Mobile Recharges
          </p>
          <p className="text-blue-300 text-xs">
            © {new Date().getFullYear()} RechargePro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
