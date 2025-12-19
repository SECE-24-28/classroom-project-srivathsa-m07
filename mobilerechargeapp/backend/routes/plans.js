const express = require('express');
const db = require('../db');

const router = express.Router();

const OPERATORS = [
  { id: 'airtel', name: 'Airtel', color: 'from-red-500 to-red-600' },
  { id: 'jio', name: 'Jio', color: 'from-blue-500 to-blue-600' },
  { id: 'vi', name: 'Vi', color: 'from-purple-500 to-purple-600' },
  { id: 'bsnl', name: 'BSNL', color: 'from-yellow-500 to-orange-600' }
];

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
};

// Get plans by operator
router.get('/:operator', async (req, res) => {
  try {
    const { operator } = req.params;
    let plans = await db.planOps.getByOperator(operator);
    
    // Fallback to static data if database is empty
    if (!plans || plans.length === 0) {
      plans = PLANS_BY_OPERATOR[operator] || [];
    }
    
    if (plans.length === 0) {
      return res.status(404).json({ error: 'No plans found for operator' });
    }
    
    res.json({ plans });
  } catch (error) {
    console.error('Plans error:', error);
    // Fallback to static data on error
    const plans = PLANS_BY_OPERATOR[req.params.operator] || [];
    res.json({ plans });
  }
});

// Get all operators
router.get('/', (req, res) => {
  try {
    res.json({ operators: OPERATORS });
  } catch (error) {
    console.error('Operators error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
