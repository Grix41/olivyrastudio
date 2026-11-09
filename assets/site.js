(function () {
  var toggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  if (toggle && mobileNav) {
    var setNav = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      mobileNav.hidden = !open;
    };

    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });

    mobileNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setNav(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });
  }

  var indexShop = document.getElementById('shop');
  var filterButtons = indexShop ? Array.prototype.slice.call(indexShop.querySelectorAll('.filter-btn')) : [];
  var filterLinks = indexShop ? Array.prototype.slice.call(document.querySelectorAll('[data-set-filter]')) : [];
  var cards = indexShop ? Array.prototype.slice.call(document.querySelectorAll('#product-grid .product-card')) : [];
  var count = indexShop ? document.getElementById('shop-count') : null;
  var shopSection = indexShop;

  if (filterButtons.length && count) {
    var counts = {
      all: '4 items',
      digital: '2 digital designs',
      apparel: '2 apparel pieces'
    };

    var applyFilter = function (value) {
      filterButtons.forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.getAttribute('data-filter') === value));
      });
      cards.forEach(function (card) {
        card.hidden = value !== 'all' && card.getAttribute('data-category') !== value;
      });
      count.textContent = counts[value] || counts.all;
    };

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        applyFilter(button.getAttribute('data-filter'));
      });
    });

    filterLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        applyFilter(link.getAttribute('data-set-filter'));
        if (shopSection) {
          window.requestAnimationFrame(function () {
            shopSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      });
    });
  }

  var form = document.getElementById('signup-form');
  var input = document.getElementById('email');
  var error = document.getElementById('email-error');
  var success = document.getElementById('form-success');
  var reset = document.getElementById('signup-reset');
  var submitBtn = document.querySelector('#signup-form button[type="submit"]');

  if (form && input && error && success && reset) {
    var isValid = function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    };

    var showError = function (show) {
      error.hidden = !show;
      if (show) {
        input.setAttribute('aria-invalid', 'true');
      } else {
        input.removeAttribute('aria-invalid');
      }
    };

    input.addEventListener('blur', function () {
      if (input.value.trim() !== '' && !isValid(input.value.trim())) showError(true);
    });

    input.addEventListener('input', function () {
      if (isValid(input.value.trim())) showError(false);
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var email = input.value.trim();
      if (!isValid(email)) {
        showError(true);
        input.focus();
        return;
      }
      showError(false);
      submitBtn.disabled = true;
      submitBtn.textContent = 'Joining…';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'newsletter', email: email }).toString()
      })
      .then(function (res) {
        if (!res.ok) throw new Error('fail');
        success.hidden = false;
        form.hidden = true;
        success.focus();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Notify me';
      })
      .catch(function () {
        showError(true);
        error.textContent = 'Something went wrong. Please try again.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Notify me';
      });
    });

    reset.addEventListener('click', function () {
      success.hidden = true;
      form.hidden = false;
      input.value = '';
      showError(false);
      input.focus();
    });
  }

  // Product gallery zoom lives in assets/product.js — loaded only on product detail pages.
})();
