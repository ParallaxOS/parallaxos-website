/* ParallaxOS — site behaviour
   Mobile nav, parallax orbs, scroll reveal, hero dashboard tilt,
   FAQ keyboard support, ROI calculator, contact form stub,
   Edge Mode connectivity banner, current year stamp.
*/
(function () {
  'use strict';

  // ---- Year stamp ----
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- Mobile menu toggle ----
  var toggle = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    // close on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }

  // ---- Parallax orbs (cheap mouse parallax on hero) ----
  var hero = document.querySelector('.hero');
  if (hero && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var orbs = hero.querySelectorAll('.orb');
    hero.addEventListener('mousemove', function (e) {
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      orbs.forEach(function (orb, i) {
        var depth = (i + 1) * 12;
        orb.style.transform = 'translate(' + (x * depth) + 'px, ' + (y * depth) + 'px)';
      });
    });
  }

  // ---- Hero dashboard tilt on scroll ----
  var dash = document.querySelector('.dash-frame');
  if (dash && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    function updateDash() {
      var rect = dash.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var ratio = Math.max(0, Math.min(1, 1 - (rect.top / vh)));
      var rotateX = Math.max(0, 6 - ratio * 6);
      dash.style.transform = 'rotateX(' + rotateX + 'deg)';
    }
    document.addEventListener('scroll', updateDash, { passive: true });
    updateDash();
  }

  // ---- Scroll reveal ----
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ---- Active nav link based on filename ----
  (function () {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('/').pop();
      if (href === path) a.classList.add('active');
    });
  })();

  // ---- Edge Mode banner: show when offline ----
  var banner = document.querySelector('.edge-banner');
  if (banner) {
    function setEdge() {
      banner.classList.toggle('active', !navigator.onLine);
    }
    window.addEventListener('online', setEdge);
    window.addEventListener('offline', setEdge);
    setEdge();
  }

  // ---- Contact form (client-side validation only; production wires to backend) ----
  var form = document.querySelector('form[data-contact]');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = Object.fromEntries(new FormData(form));
      if (!data.name || !data.email) {
        if (status) { status.textContent = 'Please complete all required fields.'; status.style.color = 'var(--status-blocked)'; }
        return;
      }
      if (status) {
        status.style.color = 'var(--status-cleared)';
        status.textContent = 'Thanks ' + data.name + ' — your enquiry has been received. The Parallax team will reply within one business day.';
      }
      form.reset();
    });
  }

  // ---- ROI calculator on pricing page ----
  var roi = document.querySelector('[data-roi]');
  if (roi) {
    var workersIn = roi.querySelector('[data-workers]');
    var rateIn    = roi.querySelector('[data-rate]');
    var hoursIn   = roi.querySelector('[data-hours]');
    var workersOut = roi.querySelector('[data-out-workers]');
    var rateOut    = roi.querySelector('[data-out-rate]');
    var hoursOut   = roi.querySelector('[data-out-hours]');
    var monthlyOut = roi.querySelector('[data-out-monthly]');
    var annualOut  = roi.querySelector('[data-out-annual]');
    var roiOut     = roi.querySelector('[data-out-roi]');
    var planOut    = roi.querySelector('[data-out-plan]');

    function fmt(n) { return '$' + Math.round(n).toLocaleString('en-AU'); }
    function recalc() {
      var w = +workersIn.value;
      var r = +rateIn.value;
      var h = +hoursIn.value;
      workersOut.textContent = w;
      rateOut.textContent = '$' + r + '/hr';
      hoursOut.textContent = h + 'h';
      var monthly = h * r;
      var planCost = w <= 5 ? 299 : w <= 15 ? 599 : 1499; // Enterprise estimate
      var planLabel = w <= 5 ? 'Starter $299/mo' : w <= 15 ? 'Professional $599/mo' : 'Enterprise (est. $1,499/mo)';
      var net = monthly - planCost;
      var ratio = monthly / planCost;
      monthlyOut.textContent = fmt(monthly);
      annualOut.textContent  = fmt(monthly * 12);
      roiOut.textContent = ratio.toFixed(1) + '×';
      planOut.textContent = planLabel + ' · saves ' + fmt(net) + '/mo';
    }
    [workersIn, rateIn, hoursIn].forEach(function (el) { el && el.addEventListener('input', recalc); });
    recalc();
  }
})();
