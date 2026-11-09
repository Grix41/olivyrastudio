(function () {
  var grid = document.getElementById('shop-grid');
  var search = document.getElementById('shop-search');
  var clearSearch = document.getElementById('search-clear');
  var sort = document.getElementById('shop-sort');
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll('[data-shop-filter]'));
  var resetButtons = Array.prototype.slice.call(document.querySelectorAll('[data-reset-filters]'));
  var count = document.getElementById('shop-count');
  var empty = document.getElementById('empty-state');

  if (!grid || !search || !clearSearch || !sort || !count || !empty) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.product-card'));

  var sorts = ['featured', 'newest', 'price-asc', 'price-desc', 'name-asc'];

  var state = {
    query: '',
    category: 'all',
    sort: 'featured'
  };

  try {
    var params = new URLSearchParams(window.location.search);
    var categoryParam = params.get('category');
    if (categoryParam === 'digital' || categoryParam === 'apparel') {
      state.category = categoryParam;
    }
    var queryParam = params.get('q');
    if (queryParam) {
      state.query = queryParam;
      search.value = queryParam;
    }
    var sortParam = params.get('sort');
    if (sorts.indexOf(sortParam) !== -1) {
      state.sort = sortParam;
      sort.value = sortParam;
    }
  } catch (error) {
    /* URL parameters are optional. */
  }

  function normalize(value) {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function applyFilters() {
    var query = normalize(state.query.trim());
    var visible = 0;

    cards.forEach(function (card) {
      var matchesCategory = state.category === 'all' || card.getAttribute('data-category') === state.category;
      var searchable = normalize([
        card.getAttribute('data-name') || '',
        card.getAttribute('data-category') || '',
        card.getAttribute('data-keywords') || ''
      ].join(' '));
      var matchesQuery = query === '' || searchable.indexOf(query) !== -1;
      var show = matchesCategory && matchesQuery;

      card.hidden = !show;
      if (show) visible += 1;
    });

    count.textContent = visible === cards.length
      ? cards.length + ' pieces'
      : visible + ' of ' + cards.length + ' pieces';

    grid.hidden = visible === 0;
    empty.hidden = visible !== 0;

    var hasFilters = state.query.trim() !== '' || state.category !== 'all' || state.sort !== 'featured';
    resetButtons.forEach(function (button) {
      button.hidden = !hasFilters;
    });

    clearSearch.hidden = state.query === '';

    filterButtons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-shop-filter') === state.category));
    });
  }

  function sortCards() {
    var sorted = cards.slice();

    if (state.sort === 'price-asc') {
      sorted.sort(function (a, b) {
        return Number(a.getAttribute('data-price')) - Number(b.getAttribute('data-price'));
      });
    } else if (state.sort === 'price-desc') {
      sorted.sort(function (a, b) {
        return Number(b.getAttribute('data-price')) - Number(a.getAttribute('data-price'));
      });
    } else if (state.sort === 'name-asc') {
      sorted.sort(function (a, b) {
        return (a.getAttribute('data-name') || '').localeCompare(b.getAttribute('data-name') || '');
      });
    } else if (state.sort === 'newest') {
      sorted.sort(function (a, b) {
        return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
      });
    } else {
      sorted.sort(function (a, b) {
        return Number(a.getAttribute('data-order')) - Number(b.getAttribute('data-order'));
      });
    }

    sorted.forEach(function (card) {
      grid.appendChild(card);
    });
  }

  function syncUrl() {
    try {
      var params = new URLSearchParams();
      if (state.category !== 'all') params.set('category', state.category);
      if (state.query.trim() !== '') params.set('q', state.query.trim());
      if (state.sort !== 'featured') params.set('sort', state.sort);
      var query = params.toString();
      var url = new URL(window.location.href);
      url.search = query;
      url.hash = '';
      window.history.replaceState(null, '', url.toString());
    } catch (error) {
      /* URL syncing is optional. */
    }
  }

  function resetAll() {
    state.query = '';
    state.category = 'all';
    state.sort = 'featured';
    search.value = '';
    sort.value = 'featured';
    sortCards();
    applyFilters();
    syncUrl();
    search.focus();
  }

  search.addEventListener('input', function () {
    state.query = search.value;
    applyFilters();
    syncUrl();
  });

  search.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && search.value !== '') {
      search.value = '';
      state.query = '';
      applyFilters();
      syncUrl();
    }
  });

  clearSearch.addEventListener('click', function () {
    search.value = '';
    state.query = '';
    applyFilters();
    syncUrl();
    search.focus();
  });

  sort.addEventListener('change', function () {
    state.sort = sort.value;
    sortCards();
    applyFilters();
    syncUrl();
  });

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      state.category = button.getAttribute('data-shop-filter');
      applyFilters();
      syncUrl();
    });
  });

  resetButtons.forEach(function (button) {
    button.addEventListener('click', resetAll);
  });

  window.addEventListener('popstate', function () {
    var params = new URLSearchParams(window.location.search);
    var categoryParam = params.get('category');
    state.category = categoryParam === 'digital' || categoryParam === 'apparel' ? categoryParam : 'all';
    state.query = params.get('q') || '';
    var sortParam = params.get('sort');
    state.sort = sorts.indexOf(sortParam) !== -1 ? sortParam : 'featured';
    search.value = state.query;
    sort.value = state.sort;
    sortCards();
    applyFilters();
  });

  sortCards();
  applyFilters();
})();
