// State
let cart = [];

// DOM Elements
const productContainer = document.getElementById('product-container');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');
const filterBtns = document.querySelectorAll('.filter-btn');

// 1. Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(productsData);
    setupEventListeners();
});

// 2. Render Products
function renderProducts(products) {
    productContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <span class="product-cat">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// 3. Cart Functions
function addToCart(id) {
    const product = productsData.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    openCart();
    showToast("Item added to cart");
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function changeQuantity(id, action) {
    const item = cart.find(item => item.id === id);
    if (action === 'inc') {
        item.quantity++;
    } else if (action === 'dec') {
        item.quantity--;
        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
    }
    updateCartUI();
}

function updateCartUI() {
    // Update Count
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.innerText = totalCount;

    // Update Total Price
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotalElement.innerText = '$' + totalPrice.toFixed(2);

    // Render Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <div class="product-price">$${item.price.toFixed(2)}</div>
                    <div class="item-quantity-ctrl">
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, 'dec')">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQuantity(${item.id}, 'inc')">+</button>
                    </div>
                </div>
                <div class="item-remove" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `).join('');
    }
}

// 4. UI Events
function openCart() {
    cartSidebar.classList.add('show');
    cartOverlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
}

function closeCart() {
    cartSidebar.classList.remove('show');
    cartOverlay.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function setupEventListeners() {
    // Cart Toggles
    cartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Category Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to click
            e.target.classList.add('active');
            
            const category = e.target.dataset.category;
            
            if (category === 'all') {
                renderProducts(productsData);
            } else {
                const filtered = productsData.filter(p => p.category === category);
                renderProducts(filtered);
            }
        });
    });
}

// Toast Notification Helper
function showToast(message) {
    const x = document.getElementById("toast");
    x.innerText = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}