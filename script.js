// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const searchIcon = document.querySelector('.search-icon');
const searchModal = document.querySelector('.search-modal');
const closeSearch = document.querySelector('.close-search');
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
const newsletterForm = document.querySelector('.newsletter-form');

// Global Variables
let cart = [];
let isLoading = true;

// Initialize Website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Hero Watch Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-watch-img');
const dots = document.querySelectorAll('.dot');
const watchNames = ['Rolex Submariner', 'Audemars Piguet Royal Oak', 'Patek Philippe Calatrava'];
const watchPrices = ['$8,950', '$28,900', '$32,500'];

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Update watch details
    const watchName = document.querySelector('.watch-name');
    const watchPrice = document.querySelector('.watch-price');
    if (watchName && watchPrice) {
        watchName.textContent = watchNames[index];
        watchPrice.textContent = watchPrices[index];
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function initializeHeroCarousel() {
    // Auto-advance slides
    setInterval(nextSlide, 4000);
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Animated Counter
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current >= target) {
                current = target;
                counter.textContent = target.toLocaleString() + '+';
                return;
            }
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        };
        
        updateCounter();
    });
}

function initializeWebsite() {
    // Loading Screen Animation
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            isLoading = false;
            initializeAnimations();
        }, 500);
    }, 3000);

    // Initialize all event listeners
    initializeEventListeners();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize product filtering
    initializeProductFiltering();
    
    // Initialize cart functionality
    initializeCart();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize intersection observer for animations
    initializeIntersectionObserver();
    
    // Initialize hero carousel
    initializeHeroCarousel();
    
    // Initialize animated counters
    setTimeout(animateCounters, 1000);
    
    // Initialize scroll indicator
    initializeScrollIndicator();
    
    // Initialize page-specific functionality
    initializePageSpecific();
    
    // Initialize mobile enhancements
    initializeMobileScrollEffects();
    initializeTouchGestures();
    initializeResponsiveImages();
    setViewportHeight();
    initializeMobileMenuEvents();
    
    // Handle orientation changes
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', setViewportHeight);
    
    // Update mobile cart count initially
    updateMobileCartCount();
}

function initializeEventListeners() {
    // Mobile menu toggle
    hamburger?.addEventListener('click', toggleMobileMenu);
    
    // Cart functionality
    cartIcon?.addEventListener('click', toggleCart);
    closeCart?.addEventListener('click', toggleCart);
    
    // Search functionality
    searchIcon?.addEventListener('click', toggleSearch);
    closeSearch?.addEventListener('click', toggleSearch);
    
    // Close modals on outside click
    searchModal?.addEventListener('click', (e) => {
        if (e.target === searchModal) toggleSearch();
    });
    
    cartSidebar?.addEventListener('click', (e) => {
        if (e.target === cartSidebar) toggleCart();
    });
    
    // Newsletter form
    newsletterForm?.addEventListener('submit', handleNewsletterSubmit);
    
    // Product interactions
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });
    
    // Quick view buttons
    document.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', handleQuickView);
    });
    
    // Collection explore buttons
    document.querySelectorAll('.explore-btn').forEach(btn => {
        btn.addEventListener('click', handleExploreCollection);
    });
    
    // Hero buttons
    document.querySelector('.btn-primary')?.addEventListener('click', () => {
        document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.querySelector('.btn-secondary')?.addEventListener('click', () => {
        showVideoModal();
    });
}

function initializeScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar scroll effect
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallax = hero.querySelector('.hero-background');
            if (parallax) {
                parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }
        
        // Update scroll direction
        if (scrollTop > lastScrollTop) {
            document.body.classList.add('scroll-down');
            document.body.classList.remove('scroll-up');
        } else {
            document.body.classList.add('scroll-up');
            document.body.classList.remove('scroll-down');
        }
        
        lastScrollTop = scrollTop;
    });
}

function initializeProductFiltering() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
}

function filterProducts(filter) {
    productCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        
        setTimeout(() => {
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.animation = `fadeInUp 0.5s ease forwards`;
            } else {
                card.classList.add('hidden');
            }
        }, index * 50);
    });
}

function initializeCart() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('clockaholic-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

function initializeSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('product-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
                
                if (entry.target.classList.contains('collection-card')) {
                    entry.target.style.animation = 'slideInUp 0.8s ease forwards';
                }
                
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .collection-card, .stat').forEach(el => {
        observer.observe(el);
    });
}

function initializeAnimations() {
    // Stagger animation for hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Floating animation for watch showcase
    const watchShowcase = document.querySelector('.watch-showcase');
    if (watchShowcase) {
        setInterval(() => {
            watchShowcase.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 10}px)`;
        }, 16);
    }
    
    // Particle animation
    createParticleAnimation();
}

function createParticleAnimation() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(212, 175, 55, 0.3);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${5 + Math.random() * 10}s infinite linear;
        `;
        hero.appendChild(particle);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    document.body.classList.toggle('mobile-menu-open');
    
    // Enhanced hamburger animation
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[0].style.background = 'var(--secondary-color)';
        spans[1].style.opacity = '0';
        spans[1].style.transform = 'scale(0)';
        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
        spans[2].style.background = 'var(--secondary-color)';
        
        // Add blur effect to background content
        document.querySelector('.hero')?.style.setProperty('filter', 'blur(3px)');
        document.querySelector('.features')?.style.setProperty('filter', 'blur(3px)');
        document.querySelector('.collections')?.style.setProperty('filter', 'blur(3px)');
        document.querySelector('.product-showcase')?.style.setProperty('filter', 'blur(3px)');
    } else {
        spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '';
            span.style.background = '';
        });
        
        // Remove blur effect
        document.querySelector('.hero')?.style.removeProperty('filter');
        document.querySelector('.features')?.style.removeProperty('filter');
        document.querySelector('.collections')?.style.removeProperty('filter');
        document.querySelector('.product-showcase')?.style.removeProperty('filter');
    }
}

// Close mobile menu when clicking overlay
function initializeMobileMenuEvents() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Close menu when clicking overlay
    mobileMenuOverlay?.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking nav links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMobileMenu, 200); // Small delay for better UX
        });
    });
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const spans = hamburger.querySelectorAll('span');
    
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.classList.remove('mobile-menu-open');
    
    spans.forEach(span => {
        span.style.transform = '';
        span.style.opacity = '';
        span.style.background = '';
    });
    
    // Remove blur effects
    document.querySelector('.hero')?.style.removeProperty('filter');
    document.querySelector('.features')?.style.removeProperty('filter');
    document.querySelector('.collections')?.style.removeProperty('filter');
    document.querySelector('.product-showcase')?.style.removeProperty('filter');
}

// Update mobile cart count
function updateMobileCartCount() {
    const mobileCartCount = document.querySelector('.mobile-cart-count');
    const cartCountElement = document.querySelector('.cart-count');
    
    if (mobileCartCount && cartCountElement) {
        mobileCartCount.textContent = cartCountElement.textContent;
        mobileCartCount.style.display = cartCountElement.textContent === '0' ? 'none' : 'inline';
    }
}

// Navigate to cart page
function goToCart() {
    window.location.href = 'cart.html';
}

// Navigate to checkout page
function goToCheckout() {
    window.location.href = 'checkout.html';
}

// Enhanced scroll effects for mobile
function initializeMobileScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show navbar on scroll for mobile
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Enhanced navbar background
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// Touch gesture support for carousel
function initializeTouchGestures() {
    const watchCarousel = document.querySelector('.watch-carousel');
    if (!watchCarousel) return;
    
    let startX = 0;
    let startY = 0;
    let isSwipe = false;
    
    watchCarousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwipe = true;
    });
    
    watchCarousel.addEventListener('touchmove', (e) => {
        if (!isSwipe) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        // Prevent vertical scroll if horizontal swipe
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
        }
    });
    
    watchCarousel.addEventListener('touchend', (e) => {
        if (!isSwipe) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        // Minimum swipe distance
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
                showSlide(currentSlide);
            }
        }
        
        isSwipe = false;
    });
}

// Responsive image loading
function initializeResponsiveImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading attribute for better performance
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Handle image load errors
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
}

// Viewport height fix for mobile browsers
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Orientation change handler
function handleOrientationChange() {
    setTimeout(() => {
        setViewportHeight();
        
        // Recalculate hero section height
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth <= 768) {
            if (window.innerHeight < 500) {
                hero.style.minHeight = '100vh';
            } else {
                hero.style.minHeight = '90vh';
            }
        }
    }, 100);
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
    document.body.classList.toggle('cart-open');
}

function toggleSearch() {
    searchModal.classList.toggle('open');
    if (searchModal.classList.contains('open')) {
        document.querySelector('.search-input').focus();
    }
}

function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPriceText = productCard.querySelector('.current-price').textContent;
    const productImage = productCard.querySelector('img').src;
    const productCategory = productCard.querySelector('.product-category')?.textContent || 'Luxury Watch';
    
    // Convert price to number
    const productPrice = parseFloat(productPriceText.replace(/[$,]/g, ''));
    
    const product = {
        id: Date.now(),
        name: productName,
        price: productPrice,
        image: productImage,
        category: productCategory,
        quantity: 1
    };
    
    // Add to cart with animation
    addToCartAnimation(e.target, product);
}

function addToCartAnimation(button, product) {
    // Create flying animation
    const rect = button.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    
    const flyingElement = document.createElement('div');
    flyingElement.style.cssText = `
        position: fixed;
        top: ${rect.top}px;
        left: ${rect.left}px;
        width: 20px;
        height: 20px;
        background: var(--secondary-color);
        border-radius: 50%;
        z-index: 9999;
        pointer-events: none;
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    document.body.appendChild(flyingElement);
    
    // Animate to cart
    setTimeout(() => {
        flyingElement.style.top = `${cartRect.top}px`;
        flyingElement.style.left = `${cartRect.left}px`;
        flyingElement.style.transform = 'scale(0)';
        flyingElement.style.opacity = '0';
    }, 50);
    
    // Remove element and add to cart
    setTimeout(() => {
        document.body.removeChild(flyingElement);
        addToCart(product);
        
        // Cart icon animation
        cartIcon.style.animation = 'bounce 0.5s ease';
        setTimeout(() => {
            cartIcon.style.animation = '';
        }, 500);
    }, 850);
}

function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }
    
    updateCartUI();
    saveCart();
    showNotification(`${product.name} added to cart!`);
    
    // Update mobile cart count
    updateMobileCartCount();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    // Update cart sidebar
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            if (cartTotal) cartTotal.textContent = 'Total: $0.00';
        } else {
            cartItems.innerHTML = cart.map(item => {
                const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.toString().replace(/[$,]/g, ''));
                return `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" onerror="this.src='https://via.placeholder.com/60x60?text=Watch'">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>$${price.toLocaleString()}</p>
                            <div class="quantity-controls">
                                <button onclick="updateQuantity('${item.name}', -1)">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity('${item.name}', 1)">+</button>
                            </div>
                        </div>
                        <button onclick="removeFromCart('${item.name}')" class="remove-item">×</button>
                    </div>
                `;
            }).join('');
            
            const total = cart.reduce((sum, item) => {
                const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.toString().replace(/[$,]/g, ''));
                return sum + (price * item.quantity);
            }, 0);
            
            if (cartTotal) cartTotal.textContent = `Total: $${total.toLocaleString()}`;
        }
    }
    
    // Update mobile cart count
    updateMobileCartCount();
}

function updateQuantity(productName, change) {
    const item = cart.find(item => item.name === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productName);
        } else {
            updateCartUI();
            saveCart();
        }
    }
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartUI();
    saveCart();
    showNotification('Item removed from cart');
    updateMobileCartCount();
}

function saveCart() {
    localStorage.setItem('clockaholic-cart', JSON.stringify(cart));
}

function handleQuickView(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    
    showQuickViewModal(productCard);
}

function showQuickViewModal(productCard) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${productCard.querySelector('img').src}" alt="${productCard.querySelector('h3').textContent}">
                </div>
                <div class="modal-details">
                    <h2>${productCard.querySelector('h3').textContent}</h2>
                    <p class="modal-category">${productCard.querySelector('.product-category').textContent}</p>
                    <div class="modal-rating">
                        ${productCard.querySelector('.product-rating').innerHTML}
                    </div>
                    <div class="modal-price">
                        ${productCard.querySelector('.product-price').innerHTML}
                    </div>
                    <p class="modal-description">
                        Experience the perfect blend of luxury and precision with this exceptional timepiece. 
                        Crafted with meticulous attention to detail, this watch represents the pinnacle of 
                        horological excellence.
                    </p>
                    <div class="modal-actions">
                        <button class="btn-primary add-to-cart-modal">Add to Cart</button>
                        <button class="btn-secondary">Add to Wishlist</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 5000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    // Event listeners
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => document.body.removeChild(modal), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => document.body.removeChild(modal), 300);
        }
    });
}

function handleExploreCollection(e) {
    const collectionCard = e.target.closest('.collection-card');
    const collectionName = collectionCard.querySelector('h3').textContent;
    
    // Filter products by collection
    const filterMap = {
        'Luxury Collection': 'luxury',
        'Sport Collection': 'sport',
        'Classic Collection': 'classic'
    };
    
    const filter = filterMap[collectionName] || 'all';
    
    // Scroll to products section
    document.querySelector('.product-showcase').scrollIntoView({ behavior: 'smooth' });
    
    // Apply filter after scroll
    setTimeout(() => {
        const filterBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (filterBtn) {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            filterBtn.classList.add('active');
            filterProducts(filter);
        }
    }, 800);
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate API call
    const button = e.target.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'Subscribed!';
        button.style.background = '#4CAF50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = '';
            e.target.reset();
        }, 2000);
        
        showNotification('Successfully subscribed to newsletter!');
    }, 1500);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--secondary-color);
        color: var(--text-dark);
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 9999;
        font-weight: 600;
        box-shadow: var(--shadow-heavy);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function showVideoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-content">
            <button class="close-video">&times;</button>
            <div class="video-wrapper">
                <iframe width="800" height="450" src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 6000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close-video').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function animateCounter(element) {
    const target = parseInt(element.querySelector('h3').textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        element.querySelector('h3').textContent = Math.floor(current) + '+';
    }, 16);
}

// Search functionality
document.querySelector('.search-input')?.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const results = document.querySelector('.search-results');
    
    if (query.length > 2) {
        // Simulate search results
        const mockResults = [
            'Rolex Submariner',
            'Omega Speedmaster',
            'Patek Philippe Calatrava',
            'Audemars Piguet Royal Oak',
            'TAG Heuer Monaco',
            'Cartier Santos'
        ].filter(item => item.toLowerCase().includes(query));
        
        results.innerHTML = mockResults.map(result => 
            `<div class="search-result-item">${result}</div>`
        ).join('');
    } else {
        results.innerHTML = '';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        if (searchModal.classList.contains('open')) {
            toggleSearch();
        }
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
    
    // Ctrl/Cmd + K opens search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSearch();
    }
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Additional scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initializeLazyLoading();

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            
            // Show loading state
            btnText.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                btnText.textContent = 'Message Sent!';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    btnText.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    contactForm.reset();
                    showNotification('Thank you! Your message has been sent successfully.');
                }, 2000);
            }, 1500);
        });
    }
}

// Collection Category Exploration
function initializeCollectionExploration() {
    const exploreBtns = document.querySelectorAll('.explore-category-btn');
    
    exploreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const categoryCard = this.closest('.category-card');
            const categoryName = categoryCard.querySelector('h2').textContent;
            
            // Redirect to main page with filter
            const filterMap = {
                'Luxury Collection': 'luxury',
                'Sport Collection': 'sport',
                'Classic Collection': 'classic'
            };
            
            const filter = filterMap[categoryName] || 'all';
            window.location.href = `index.html#collections?filter=${filter}`;
        });
    });
}

// Initialize page-specific functionality
function initializePageSpecific() {
    // Check current page and initialize accordingly
    const currentPage = window.location.pathname.split('/').pop();
    
    switch(currentPage) {
        case 'contact.html':
            initializeContactForm();
            initializeFAQ();
            break;
        case 'collections.html':
            initializeCollectionExploration();
            break;
        case 'about.html':
            // About page specific animations
            initializeTimelineAnimations();
            break;
    }
}

// Timeline Animations for About Page
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal-content {
        background: white;
        border-radius: 15px;
        max-width: 900px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        animation: slideInUp 0.3s ease;
    }
    
    .modal-body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 40px;
        padding: 40px;
    }
    
    .modal-image img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        border-radius: 10px;
    }
    
    .modal-details h2 {
        font-size: 2rem;
        margin-bottom: 10px;
        color: var(--text-dark);
    }
    
    .modal-category {
        color: var(--text-gray);
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 15px;
    }
    
    .modal-price {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--text-dark);
        margin: 20px 0;
    }
    
    .modal-description {
        line-height: 1.6;
        color: var(--text-gray);
        margin-bottom: 30px;
    }
    
    .modal-actions {
        display: flex;
        gap: 15px;
    }
    
    .close-modal, .close-video {
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--text-gray);
        z-index: 1;
    }
    
    .cart-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px 0;
        border-bottom: 1px solid var(--border-color);
    }
    
    .item-details {
        flex: 1;
    }
    
    .item-details h4 {
        font-size: 1rem;
        margin-bottom: 5px;
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 10px;
    }
    
    .quantity-controls button {
        width: 25px;
        height: 25px;
        border: 1px solid var(--border-color);
        background: white;
        cursor: pointer;
        border-radius: 3px;
    }
    
    .remove-item {
        background: #f44336;
        color: white;
        border: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .video-content {
        position: relative;
        background: black;
        border-radius: 10px;
        overflow: hidden;
    }
    
    .video-wrapper {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
    }
    
    .video-wrapper iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .search-result-item {
        padding: 10px 15px;
        cursor: pointer;
        border-bottom: 1px solid var(--border-color);
        transition: background 0.2s ease;
    }
    
    .search-result-item:hover {
        background: var(--bg-light);
    }
    
    @media (max-width: 768px) {
        .modal-body {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px;
        }
        
        .modal-actions {
            flex-direction: column;
        }
        
        .video-wrapper iframe {
            height: 250px;
        }
    }
`;

document.head.appendChild(style);