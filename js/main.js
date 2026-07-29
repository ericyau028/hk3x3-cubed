document.addEventListener('DOMContentLoaded', function () {

  // ── Hamburger menu ──
  var hamburger = document.querySelector('.hamburger');
  var nav = document.querySelector('.nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      nav.classList.toggle('open');
    });
    document.querySelectorAll('.nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // ── Scroll reveal ──
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  // ── Countdown ──
  function initCountdown(targetId, dateStr) {
    var el = document.getElementById(targetId);
    if (!el) return;
    var target = new Date(dateStr).getTime();

    function tick() {
      var now = new Date().getTime();
      var diff = target - now;
      if (diff <= 0) {
        el.innerHTML = '<div class="countdown-item"><span class="num">已開始</span></div>';
        return;
      }
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((diff % (1000 * 60)) / 1000);
      el.innerHTML =
        '<div class="countdown-item"><span class="num">' + days + '</span><span class="label">天</span></div>' +
        '<div class="countdown-item"><span class="num">' + pad(hours) + '</span><span class="label">時</span></div>' +
        '<div class="countdown-item"><span class="num">' + pad(minutes) + '</span><span class="label">分</span></div>' +
        '<div class="countdown-item"><span class="num">' + pad(seconds) + '</span><span class="label">秒</span></div>';
    }

    function pad(n) { return n < 10 ? '0' + n : n; }

    tick();
    setInterval(tick, 1000);
  }

  initCountdown('hero-countdown', '2026-09-01T09:00:00+08:00');

  // ── Event countdowns ──
  document.querySelectorAll('.event-countdown').forEach(function (el) {
    var date = el.getAttribute('data-date');
    if (!date) return;
    var target = new Date(date).getTime();

    function tick() {
      var now = new Date().getTime();
      var diff = target - now;
      if (diff <= 0) {
        el.textContent = '已結束';
        return;
      }
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      el.textContent = days > 0 ? '剩餘 ' + days + ' 天' : '即將開始';
    }

    tick();
    setInterval(tick, 60000);
  });

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
