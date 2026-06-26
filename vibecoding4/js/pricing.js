'use strict';

// Pricing data: [Explorer, Guardian, Planet Enterprise]
const basePrices = {
  USD: [29, 99, 499],
  INR: [2499, 8299, 39999],
  EUR: [27, 89, 449],
};

const symbols = { USD: '$', INR: '₹', EUR: '€' };

let currentBilling = 'monthly';
let currentCurrency = 'USD';

function getBillingMultiplier() {
  return currentBilling === 'yearly' ? 0.8 : 1;
}

window.updatePricing = function () {
  const sel = document.getElementById('currencySelect');
  if (sel) currentCurrency = sel.value;

  const prices = basePrices[currentCurrency];
  const mult = getBillingMultiplier();
  const sym = symbols[currentCurrency];

  [0, 1, 2].forEach(i => {
    const curEl = document.getElementById('cur' + i);
    const priceEl = document.getElementById('price' + i);
    if (!curEl || !priceEl) return;

    curEl.textContent = sym;
    const finalPrice = Math.round(prices[i] * mult);

    // Animate price change
    const startVal = parseInt(priceEl.textContent) || finalPrice;
    const diff = finalPrice - startVal;
    const duration = 400;
    const startTime = performance.now();

    function animatePrice(ts) {
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      priceEl.textContent = Math.round(startVal + diff * eased);
      if (progress < 1) requestAnimationFrame(animatePrice);
      else priceEl.textContent = finalPrice;
    }

    requestAnimationFrame(animatePrice);
  });
};

window.setBilling = function (type) {
  currentBilling = type;

  const monthlyBtn = document.getElementById('monthlyBtn');
  const yearlyBtn = document.getElementById('yearlyBtn');

  if (monthlyBtn && yearlyBtn) {
    monthlyBtn.classList.toggle('active', type === 'monthly');
    yearlyBtn.classList.toggle('active', type === 'yearly');
  }

  updatePricing();
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  updatePricing();
});

// Also run immediately in case DOM is ready
updatePricing();
