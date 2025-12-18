import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar(){
  return (
    <aside className="w-64 p-4 border-r hidden md:block">
      <ul className="space-y-2 text-sm">
        <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
        <li><Link to="/plans" className="hover:underline">Plans</Link></li>
        <li><Link to="/admin" className="hover:underline">Admin</Link></li>
      </ul>
    </aside>
  )
}
