
(async function(){
  const endpoint = 'https://mockapi.io/projects/YOUR_PROJECT_ID/endpoint/plans'; // Replace with your MockAPI endpoint
  const loading = document.getElementById('loading');
  const plansGrid = document.getElementById('plansGrid');
  try{
    loading.textContent = 'Fetching plans from MockAPI...';
    const res = await fetch(endpoint);
    if(!res.ok) throw new Error('Network error');
    const plans = await res.json();
    localStorage.setItem('rp_plans_cache', JSON.stringify(plans));
    loading.style.display='none';
    plansGrid.innerHTML = plans.map(p=>`<div class='card'><h3>₹${p.price}</h3><p>${p.data} • ${p.validity}</p><p>${p.description}</p><button class='select' data-id='${p.id}'>Select</button></div>`).join('');
    document.querySelectorAll('.select').forEach(b=>b.addEventListener('click', function(){ const plans = JSON.parse(localStorage.getItem('rp_plans_cache')||'[]'); const plan = plans.find(x=>x.id==this.dataset.id); sessionStorage.setItem('selectedPlan', JSON.stringify(plan)); window.location.href='payment.html'; }));
  }catch(err){
    loading.textContent = 'Failed to fetch MockAPI. Replace endpoint variable with your MockAPI endpoint.';
    console.error(err);
  }
})();
