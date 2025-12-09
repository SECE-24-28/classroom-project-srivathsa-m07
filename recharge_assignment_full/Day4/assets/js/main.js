
document.addEventListener('DOMContentLoaded', function(){
  const signup = document.getElementById('signupForm');
  if(signup){
    signup.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const mobile = document.getElementById('mobile').value.trim();
      const pass = document.getElementById('password').value;
      if(!name||!email||!/^\d{10}$/.test(mobile)||!pass){ alert('Please fill all fields correctly'); return; }
      let users = JSON.parse(localStorage.getItem('rp_users')||'[]');
      if(users.find(u=>u.email===email||u.mobile===mobile)){ alert('User exists'); return; }
      users.push({name,email,mobile,password:pass});
      localStorage.setItem('rp_users', JSON.stringify(users));
      alert('Signup success. Login now.');
      window.location.href='login.html';
    });
  }
  const login = document.getElementById('loginForm');
  if(login){
    login.addEventListener('submit', function(e){
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const pass = document.getElementById('password').value;
      const users = JSON.parse(localStorage.getItem('rp_users')||'[]');
      const u = users.find(x=> x.email===email || x.mobile===email);
      if(!u || u.password !== pass){ alert('Invalid credentials'); return; }
      localStorage.setItem('rp_user', JSON.stringify({name:u.name,email:u.email,mobile:u.mobile}));
      window.location.href='dashboard.html';
    });
  }
  const validateBtn = document.getElementById('validateBtn');
  if(validateBtn){
    validateBtn.addEventListener('click', function(){
      const m = document.getElementById('mobile').value.trim();
      const op = document.getElementById('operator').value;
      if(!/^\d{10}$/.test(m)){ alert('Enter valid 10-digit mobile'); return; }
      if(!op){ alert('Select operator'); return; }
      sessionStorage.setItem('selectedMobile', JSON.stringify({mobile:m, operator:op}));
      window.location.href='plans.html';
    });
  }
  const plansGrid = document.getElementById('plansGrid');
  if(plansGrid){
    const cached = JSON.parse(localStorage.getItem('rp_plans_cache')||'[]');
    if(cached.length>0){
      document.getElementById('loading').style.display='none';
      plansGrid.innerHTML = cached.map(p=>`<div class='card'><h3>₹${p.price}</h3><p>${p.data} • ${p.validity}</p><p>${p.description}</p><button class='select' data-id='${p.id}'>Select</button></div>`).join('');
      document.querySelectorAll('.select').forEach(b=>b.addEventListener('click', function(){ const plans = JSON.parse(localStorage.getItem('rp_plans_cache')||'[]'); const plan = plans.find(x=>x.id==this.dataset.id); sessionStorage.setItem('selectedPlan', JSON.stringify(plan)); window.location.href='payment.html'; }));
    } else {
      document.getElementById('loading').textContent = 'No plan cache found. Day5 integrates with MockAPI to fetch plans.';
    }
  }
  const payment = document.getElementById('paymentForm');
  if(payment){
    payment.addEventListener('submit', function(e){
      e.preventDefault();
      const sel = JSON.parse(sessionStorage.getItem('selectedPlan')||'{}');
      if(!sel.id){ alert('No plan selected'); return; }
      const txid = 'TX'+Math.floor(Math.random()*1000000);
      const mobile = (JSON.parse(sessionStorage.getItem('selectedMobile')||'{}')).mobile||'unknown';
      const history = JSON.parse(localStorage.getItem('rp_history')||'[]');
      history.unshift({txid, mobile, plan:sel.data||sel.price, price:sel.price||0, status:'Success', time:new Date().toISOString()});
      localStorage.setItem('rp_history', JSON.stringify(history));
      sessionStorage.setItem('lastTx', JSON.stringify({txid,status:'Success'}));
      window.location.href='confirmation.html';
    });
  }
});
