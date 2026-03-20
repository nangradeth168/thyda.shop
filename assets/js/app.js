// ========================================
// THYDA SHOP — Main App JS
// ========================================

// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('thyda_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('thyda_wishlist') || '[]');

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initHeroSlider();
  initTimer();
  initCartDrawer();
  initBackToTop();
  updateCounts();

  // Page-specific
  if (document.getElementById('featuredGrid')) initHomePage();
  if (document.getElementById('newsletterForm')) initNewsletter();
});

// ===== LOADER =====
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => loader.classList.add('hidden'), 1600);
}

// ===== NAVBAR =====
function initNavbar() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('overlay');

  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }

  // Search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        window.location.href = `shop.html?search=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      if (searchInput.value.trim()) {
        window.location.href = `shop.html?search=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }
}

// ===== HERO SLIDER =====
function initHeroSlider() {
  const slider = document.getElementById('heroSlider');
  if (!slider) return;
  const slides = slider.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroDots');
  if (!slides.length) return;

  let current = 0;
  let timer;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    if (dotsContainer) dotsContainer.appendChild(dot);
  });

  function goTo(idx) {
    slides[current].classList.remove('active');
    document.querySelectorAll('.hero-dot')[current]?.classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    document.querySelectorAll('.hero-dot')[current]?.classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  document.getElementById('heroPrev')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('heroNext')?.addEventListener('click', () => goTo(current + 1));
  resetTimer();
}

// ===== COUNTDOWN TIMER =====
function initTimer() {
  const th = document.getElementById('th');
  const tm = document.getElementById('tm');
  const ts = document.getElementById('ts');
  if (!th) return;

  let end = new Date();
  end.setHours(end.getHours() + 5);
  end.setMinutes(end.getMinutes() + 37);
  end.setSeconds(end.getSeconds() + 22);

  setInterval(() => {
    const now = new Date();
    let diff = Math.max(0, (end - now) / 1000);
    const h = Math.floor(diff / 3600);
    diff %= 3600;
    const m = Math.floor(diff / 60);
    const s = Math.floor(diff % 60);
    th.textContent = String(h).padStart(2, '0');
    tm.textContent = String(m).padStart(2, '0');
    ts.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// ===== PRODUCT CARD =====
function createProductCard(product) {
  const inWishlist = wishlist.includes(product.id);
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : null;
  const starsHtml = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');

  return `
    <div class="product-card" data-id="${product.id}" data-cat="${product.category}">
      <div class="product-img-wrap" onclick="viewProduct(${product.id})">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="product-badges">
          ${product.badge === 'sale' && discount ? `<span class="badge-tag badge-sale">-${discount}%</span>` : ''}
          ${product.badge === 'new' ? '<span class="badge-tag badge-new">NEW</span>' : ''}
          ${product.badge === 'hot' ? '<span class="badge-tag badge-hot">🔥 HOT</span>' : ''}
        </div>
        <div class="product-actions">
          <button class="action-btn wishlist-btn ${inWishlist ? 'active' : ''}" onclick="toggleWishlist(event, ${product.id})" title="Wishlist">
            <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
          </button>
          <button class="action-btn" onclick="viewProduct(${product.id})" title="Quick View">
            <i class="fa fa-eye"></i>
          </button>
        </div>
      </div>
      <div class="product-body">
        <div class="product-cat">${getCatName(product.category)}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-rating">
          <span class="stars-display">${starsHtml}</span>
          <span class="rating-num">(${product.reviews})</span>
        </div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-new">$${product.price.toFixed(2)}</span>
            ${product.oldPrice ? `<span class="price-old">$${product.oldPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="add-cart-btn" onclick="addToCart(event, ${product.id})" title="Add to Cart">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function getCatName(cat) {
  const map = { electronics: 'អេឡិចត្រូនិក', fashion: 'សម្លៀកបំពាក់', beauty: 'ម្សៅ & សម្អាង', home: 'គ្រឿងផ្ទះ', sport: 'កីឡា', food: 'អាហារ' };
  return map[cat] || cat;
}

// ===== HOME PAGE =====
function initHomePage() {
  const featuredGrid = document.getElementById('featuredGrid');
  const newArrivalsGrid = document.getElementById('newArrivalsGrid');

  const featured = PRODUCTS.filter(p => p.isFeatured).slice(0, 8);
  const newItems = PRODUCTS.filter(p => p.isNew).slice(0, 4);

  if (featuredGrid) featuredGrid.innerHTML = featured.map(createProductCard).join('');
  if (newArrivalsGrid) newArrivalsGrid.innerHTML = newItems.map(createProductCard).join('');

  // Filter tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      const items = filter === 'all' ? PRODUCTS.filter(p => p.isFeatured).slice(0, 8) : PRODUCTS.filter(p => p.category === filter).slice(0, 8);
      if (featuredGrid) {
        featuredGrid.style.opacity = '0';
        setTimeout(() => {
          featuredGrid.innerHTML = items.map(createProductCard).join('');
          featuredGrid.style.opacity = '1';
          featuredGrid.style.transition = 'opacity 0.3s';
        }, 200);
      }
    });
  });
}

// ===== SHOP PAGE =====
let shopProducts = [...PRODUCTS];
let shopPage = 1;
const PER_PAGE = 12;

function initShopPage() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  const sale = params.get('sale');
  const search = params.get('search');

  if (cat) {
    shopProducts = PRODUCTS.filter(p => p.category === cat);
    document.querySelectorAll('.cat-list a').forEach(a => {
      a.classList.toggle('active', a.dataset.cat === cat);
    });
  } else if (sale) {
    shopProducts = PRODUCTS.filter(p => p.oldPrice);
  } else if (search) {
    shopProducts = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
    const sidebarSearch = document.getElementById('sidebarSearch');
    if (sidebarSearch) sidebarSearch.value = search;
  }

  renderShop();

  // Sort
  document.getElementById('sortSelect')?.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'price-low') shopProducts.sort((a, b) => a.price - b.price);
    else if (val === 'price-high') shopProducts.sort((a, b) => b.price - a.price);
    else if (val === 'rating') shopProducts.sort((a, b) => b.rating - a.rating);
    else if (val === 'newest') shopProducts = [...shopProducts].filter(p => p.isNew).concat(shopProducts.filter(p => !p.isNew));
    else shopProducts = [...PRODUCTS].filter(p => shopProducts.map(x => x.id).includes(p.id));
    shopPage = 1;
    renderShop();
  });

  // View toggle
  document.getElementById('gridView')?.addEventListener('click', () => {
    document.getElementById('shopGrid')?.classList.remove('list-view');
    document.getElementById('gridView')?.classList.add('active');
    document.getElementById('listView')?.classList.remove('active');
  });
  document.getElementById('listView')?.addEventListener('click', () => {
    document.getElementById('shopGrid')?.classList.add('list-view');
    document.getElementById('listView')?.classList.add('active');
    document.getElementById('gridView')?.classList.remove('active');
  });

  // Category filter
  document.querySelectorAll('.cat-list a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.cat-list a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      const cat = a.dataset.cat;
      shopProducts = cat === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.category === cat);
      shopPage = 1;
      renderShop();
    });
  });

  // Price range
  const priceRange = document.getElementById('priceRange');
  const priceVal = document.getElementById('priceVal');
  priceRange?.addEventListener('input', () => {
    if (priceVal) priceVal.textContent = `$${priceRange.value}`;
  });

  // Apply filters
  document.getElementById('applyFilters')?.addEventListener('click', () => {
    const maxPrice = parseFloat(document.getElementById('priceRange')?.value || 999);
    const rating = parseFloat(document.querySelector('[name=rating]:checked')?.value || 0);
    shopProducts = PRODUCTS.filter(p => p.price <= maxPrice && p.rating >= rating);
    shopPage = 1;
    renderShop();
    if (window.innerWidth < 992) closeSidebar();
  });

  document.getElementById('clearFilters')?.addEventListener('click', () => {
    shopProducts = [...PRODUCTS];
    shopPage = 1;
    if (document.getElementById('priceRange')) document.getElementById('priceRange').value = 500;
    if (document.getElementById('priceVal')) document.getElementById('priceVal').textContent = '$500';
    document.querySelector('[name=rating][value="0"]').checked = true;
    document.querySelectorAll('.cat-list a').forEach(a => a.classList.toggle('active', a.dataset.cat === 'all'));
    renderShop();
  });

  // Sidebar search
  const sidebarSearch = document.getElementById('sidebarSearch');
  sidebarSearch?.addEventListener('input', () => {
    const q = sidebarSearch.value.toLowerCase();
    shopProducts = q ? PRODUCTS.filter(p => p.name.toLowerCase().includes(q)) : [...PRODUCTS];
    shopPage = 1;
    renderShop();
  });

  // Sidebar toggle
  document.getElementById('sidebarToggle')?.addEventListener('click', () => {
    document.getElementById('shopSidebar')?.classList.add('open');
    document.getElementById('overlay')?.classList.add('active');
  });
  document.getElementById('sidebarClose')?.addEventListener('click', closeSidebar);
}

function closeSidebar() {
  document.getElementById('shopSidebar')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('active');
}

function renderShop() {
  const grid = document.getElementById('shopGrid');
  const resultCount = document.getElementById('resultCount');
  const pagination = document.getElementById('pagination');
  if (!grid) return;

  const start = (shopPage - 1) * PER_PAGE;
  const pageItems = shopProducts.slice(start, start + PER_PAGE);
  const totalPages = Math.ceil(shopProducts.length / PER_PAGE);

  if (resultCount) resultCount.textContent = `បង្ហាញ ${start + 1}–${Math.min(start + PER_PAGE, shopProducts.length)} នៃ ${shopProducts.length} ផលិតផល`;

  grid.innerHTML = pageItems.length
    ? pageItems.map(createProductCard).join('')
    : `<div class="text-center" style="grid-column:1/-1;padding:60px;color:var(--text-muted);font-family:var(--font-km)"><i class="fa fa-box-open" style="font-size:3rem;margin-bottom:16px"></i><br/>រកមិនឃើញទំនិញ</div>`;

  // Pagination
  if (pagination) {
    pagination.innerHTML = '';
    if (totalPages > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'page-btn';
      prevBtn.innerHTML = '<i class="fa fa-chevron-left"></i>';
      prevBtn.disabled = shopPage === 1;
      prevBtn.addEventListener('click', () => { shopPage--; renderShop(); window.scrollTo({top:0,behavior:'smooth'}); });
      pagination.appendChild(prevBtn);

      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn' + (i === shopPage ? ' active' : '');
        btn.textContent = i;
        btn.addEventListener('click', () => { shopPage = i; renderShop(); window.scrollTo({top:0,behavior:'smooth'}); });
        pagination.appendChild(btn);
      }

      const nextBtn = document.createElement('button');
      nextBtn.className = 'page-btn';
      nextBtn.innerHTML = '<i class="fa fa-chevron-right"></i>';
      nextBtn.disabled = shopPage === totalPages;
      nextBtn.addEventListener('click', () => { shopPage++; renderShop(); window.scrollTo({top:0,behavior:'smooth'}); });
      pagination.appendChild(nextBtn);
    }
  }
}

// ===== CART =====
function addToCart(e, id) {
  e.stopPropagation();
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  updateCounts();
  showToast(`បានបន្ថែម ${product.name} ទៅកន្ត្រក! 🛍️`, 'success');
  // Animate button
  if (e.currentTarget) {
    e.currentTarget.innerHTML = '<i class="fa fa-check"></i>';
    setTimeout(() => { if (e.currentTarget) e.currentTarget.innerHTML = '<i class="fa fa-plus"></i>'; }, 1200);
  }
}

function saveCart() {
  localStorage.setItem('thyda_cart', JSON.stringify(cart));
}

function updateCounts() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = total);
  document.querySelectorAll('#wishlistCount').forEach(el => el.textContent = wishlist.length);
}

// ===== CART DRAWER =====
function initCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeCart');
  const wishlistBtn = document.getElementById('wishlistBtn');

  const openDrawer = () => {
    drawer?.classList.add('open');
    overlay?.classList.add('active');
    renderCartDrawer();
  };

  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', () => { closeDrawer(); closeSidebar(); });
  wishlistBtn?.addEventListener('click', (e) => { e.preventDefault(); openDrawer(); });

  // Open via cart icon
  document.querySelectorAll('a[href="cart.html"]').forEach(a => {
    if (a.classList.contains('nav-icon')) {
      a.addEventListener('click', (e) => { e.preventDefault(); openDrawer(); });
    }
  });
}

function closeDrawer() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('active');
}

function renderCartDrawer() {
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  const totalEl = document.getElementById('cartTotal');
  if (!itemsEl) return;

  if (!cart.length) {
    itemsEl.innerHTML = `<div class="empty-cart"><i class="fa fa-shopping-bag"></i><p>កន្ត្រករបស់អ្នកទទេ</p><a href="shop.html" class="btn btn-primary">ទៅទិញ</a></div>`;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  let total = 0;
  itemsEl.innerHTML = cart.map(c => {
    const p = PRODUCTS.find(x => x.id === c.id);
    if (!p) return '';
    total += p.price * c.qty;
    return `
      <div class="drawer-item">
        <img src="${p.image}" alt="${p.name}" />
        <div class="drawer-item-info">
          <div class="drawer-item-name">${p.name}</div>
          <div class="drawer-item-qty">x${c.qty}</div>
          <div class="drawer-item-price">$${(p.price * c.qty).toFixed(2)}</div>
        </div>
        <button class="drawer-remove" onclick="removeFromCart(${p.id})"><i class="fa fa-times"></i></button>
      </div>
    `;
  }).join('');

  if (footerEl) footerEl.style.display = 'block';
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCounts();
  renderCartDrawer();
  showToast('បានដកចេញពីកន្ត្រក', 'error');
}

// ===== CART PAGE =====
function initCartPage() {
  renderCartPage();
}

function renderCartPage() {
  const layout = document.getElementById('cartPageLayout');
  if (!layout) return;

  if (!cart.length) {
    layout.innerHTML = `
      <div class="empty-cart-page">
        <i class="fa fa-shopping-bag"></i>
        <p>កន្ត្រករបស់អ្នកទទេ</p>
        <a href="shop.html" class="btn btn-primary">ទៅទិញ</a>
      </div>`;
    return;
  }

  let subtotal = 0;
  cart.forEach(c => {
    const p = PRODUCTS.find(x => x.id === c.id);
    if (p) subtotal += p.price * c.qty;
  });

  const shipping = subtotal >= 25 ? 0 : 3;
  const total = subtotal + shipping;

  layout.innerHTML = `
    <div class="cart-table">
      <div class="cart-table-header">
        <span>ផលិតផល</span><span>តម្លៃ</span><span>បរិមាណ</span><span>សរុប</span><span></span>
      </div>
      ${cart.map(c => {
        const p = PRODUCTS.find(x => x.id === c.id);
        if (!p) return '';
        return `
          <div class="cart-row" id="cart-row-${p.id}">
            <div class="cart-item-info">
              <img class="cart-item-img" src="${p.image}" alt="${p.name}" />
              <div><div class="cart-item-name">${p.name}</div><div class="cart-item-cat">${getCatName(p.category)}</div></div>
            </div>
            <div class="cart-price">$${p.price.toFixed(2)}</div>
            <div class="qty-control">
              <button class="qty-btn" onclick="changeQty(${p.id}, -1)"><i class="fa fa-minus"></i></button>
              <span class="qty-num" id="qty-${p.id}">${c.qty}</span>
              <button class="qty-btn" onclick="changeQty(${p.id}, 1)"><i class="fa fa-plus"></i></button>
            </div>
            <div class="cart-price">$${(p.price * c.qty).toFixed(2)}</div>
            <button class="remove-btn" onclick="removeFromCartPage(${p.id})"><i class="fa fa-trash"></i></button>
          </div>`;
      }).join('')}
    </div>
    <div class="cart-summary">
      <h3>សរុបការបញ្ជាទិញ</h3>
      <div class="summary-row"><span>ថ្លៃទំនិញ</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="summary-row"><span>ថ្លៃដឹក</span><span>${shipping === 0 ? '<span style="color:#10b981">ឥតគិតថ្លៃ</span>' : `$${shipping.toFixed(2)}`}</span></div>
      <div class="summary-row total"><span>សរុបទាំងអស់</span><span>$${total.toFixed(2)}</span></div>
      <div class="coupon-input">
        <input type="text" placeholder="លេខ Coupon..." id="couponInput" />
        <button onclick="applyCoupon()">ប្រើ</button>
      </div>
      <button class="btn btn-primary full-width" onclick="checkout()">បំពេញការបញ្ជាទិញ <i class="fa fa-arrow-right"></i></button>
      <a href="shop.html" class="btn btn-outline-dark full-width" style="margin-top:10px;justify-content:center">ទិញទំនិញបន្ថែម</a>
    </div>`;
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCounts();
  renderCartPage();
}

function removeFromCartPage(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCounts();
  renderCartPage();
  showToast('បានដកចេញ', 'error');
}

function applyCoupon() {
  const code = document.getElementById('couponInput')?.value.toUpperCase();
  if (code === 'THYDA10') {
    showToast('Coupon THYDA10 — បញ្ចុះ 10%! 🎉', 'success');
  } else {
    showToast('Coupon មិនត្រឹមត្រូវ', 'error');
  }
}

function checkout() {
  showToast('សូមអរគុណ! ការបញ្ជាទិញត្រូវបានទទួល 🎉', 'success');
  setTimeout(() => { cart = []; saveCart(); updateCounts(); renderCartPage(); }, 2000);
}

// ===== WISHLIST =====
function toggleWishlist(e, id) {
  e.stopPropagation();
  const idx = wishlist.indexOf(id);
  const btn = e.currentTarget;
  if (idx === -1) {
    wishlist.push(id);
    btn.classList.add('active');
    btn.innerHTML = '<i class="fas fa-heart"></i>';
    showToast('បានបន្ថែមទៅ Wishlist ❤️', 'success');
  } else {
    wishlist.splice(idx, 1);
    btn.classList.remove('active');
    btn.innerHTML = '<i class="far fa-heart"></i>';
    showToast('ដកចេញពី Wishlist', 'error');
  }
  localStorage.setItem('thyda_wishlist', JSON.stringify(wishlist));
  updateCounts();
}

// ===== VIEW PRODUCT =====
function viewProduct(id) {
  window.location.href = `shop.html?product=${id}`;
}

// ===== NEWSLETTER =====
function initNewsletter() {
  document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('ចុះឈ្មោះបានជោគជ័យ! ✅ ទទួល 10% OFF', 'success');
    e.target.reset();
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== TOAST =====
function showToast(message, type = 'default') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icon = type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-xmark' : 'fa-info-circle';
  toast.innerHTML = `<i class="fa ${icon}"></i> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
