/* ========================================================
   PromoSub Interactive Master Engine
   Powers all Buttons, Modals, Cart, Filters, & Live Chat
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  const state = {
    cart: [],
    discountPercent: 0,
    appliedCoupon: null,
    isLoggedIn: false,
    currentUser: null,
    currentViewingService: null,
    selectedPlanMonths: 1,
    selectedPlanMultiplier: 1.0,

    services: [
      {
        id: 'gemini-pro',
        name: 'Gemini Pro',
        nameAr: 'جيميني برو',
        badge: 'جديد',
        basePrice: 39,
        desc: 'أقوى نموذج ذكاء اصطناعي من Google للتحليل، البرمجة، وتوليد المحتوى فائق الدقة.',
        icon: 'assets/icons/gemini.png?v=5.0'
      },
      {
        id: 'youtube-premium',
        name: 'YouTube Premium',
        nameAr: 'يوتيوب بريميوم',
        badge: 'الأكثر طلباً',
        basePrice: 18,
        desc: 'مشاهدة بدون أي إعلانات، تشغيل في الخلفية مع شاشة مقفلة، وتحميل بدون إنترنت.',
        icon: 'assets/icons/youtube.png?v=5.0'
      },
      {
        id: 'netflix',
        name: 'Netflix',
        nameAr: 'نتفليكس',
        badge: null,
        basePrice: 25,
        desc: 'مكتبة ضخمة من أحدث الأفلام والمسلسلات الحصرية بدقة 4K Ultra HD وصوت محيطي.',
        icon: 'assets/icons/netflix.png'
      },
      {
        id: 'spotify-premium',
        name: 'Spotify Premium',
        nameAr: 'سبوتيفاي بريميوم',
        badge: null,
        basePrice: 19,
        desc: 'استمع بموسيقاك وبودكاستك المفضل بدون إعلانات وبأعلى جودة صوت مع ميزة التحميل.',
        icon: 'assets/icons/spotify.png?v=5.0'
      },
      {
        id: 'google-one',
        name: 'Google One',
        nameAr: 'جوجل ون',
        badge: null,
        basePrice: 22,
        desc: 'مساحة تخزين سحابية تبدأ من 2TB لنسخ صورك وملفاتك احتياطياً بأمان تام.',
        icon: 'assets/icons/google_one.png?v=5.0'
      },
      {
        id: 'disney-plus',
        name: 'Disney+',
        nameAr: 'ديزني بلس',
        badge: null,
        basePrice: 24,
        desc: 'عالم ديزني، مارفل، بيكسار، وستار وارز بجودة سينمائية فائقة ومحتوى عائلي آمن.',
        icon: 'assets/icons/disney.png'
      },
      {
        id: 'microsoft-365',
        name: 'Microsoft 365',
        nameAr: 'مايكروسوفت 365',
        badge: null,
        basePrice: 35,
        desc: 'حزمة أوفيس الرسمية (Word, Excel, PowerPoint) مع 1TB سحابية على OneDrive.',
        icon: 'assets/icons/microsoft.png?v=5.0'
      },
      {
        id: 'canva-pro',
        name: 'Canva Pro',
        nameAr: 'كانفا برو',
        badge: null,
        basePrice: 20,
        desc: 'ملايين القوالب الاحترافية، إزالة خلفيات الصور بالذكاء الاصطناعي، ومساحة غير محدودة.',
        icon: 'assets/icons/canva.png'
      },
      {
        id: 'flow',
        name: 'Flow',
        nameAr: 'فلو',
        badge: null,
        basePrice: 29,
        desc: 'أدوات توليد وتحرير ومونتاج الفيديوهات بالذكاء الاصطناعي للمحترفين وصناع المحتوى.',
        icon: 'assets/icons/flow.png'
      },
      {
        id: 'notebooklm',
        name: 'NotebookLM',
        nameAr: 'نوتبوك ال ام',
        badge: null,
        basePrice: 28,
        desc: 'مساعد أبحاث ذكي يلخص مستنداتك ويحولها إلى حلقات نقاش صوتية وملاحظات ذكية.',
        icon: 'assets/icons/notebooklm.png'
      }
    ]
  };

  // DOM Elements
  const toast = document.getElementById('toast');

  // Nav & Search
  const searchInput = document.getElementById('searchInput');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const cardsGrid = document.getElementById('cardsGrid');
  const noResultsMsg = document.getElementById('noResultsMsg');
  const resetSearchBtn = document.getElementById('resetSearchBtn');

  // Mobile Drawer
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeMobileDrawer = document.getElementById('closeMobileDrawer');
  const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');

  // Cart
  const cartBtn = document.getElementById('cartBtn');
  const cartBadge = document.getElementById('cartBadge');
  const cartModal = document.getElementById('cartModal');
  const closeCartModal = document.getElementById('closeCartModal');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartCountTitle = document.getElementById('cartCountTitle');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartDiscount = document.getElementById('cartDiscount');
  const discountLine = document.getElementById('discountLine');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const couponInput = document.getElementById('couponInput');
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const whatsappCheckoutBtn = document.getElementById('whatsappCheckoutBtn');

  // Checkout Modal
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutModal = document.getElementById('closeCheckoutModal');
  const checkoutTotalAmount = document.getElementById('checkoutTotalAmount');

  // Service Details Modal
  const serviceModal = document.getElementById('serviceModal');
  const closeServiceModal = document.getElementById('closeServiceModal');
  const modalServiceIcon = document.getElementById('modalServiceIcon');
  const modalServiceTitle = document.getElementById('modalServiceTitle');
  const modalServiceBadge = document.getElementById('modalServiceBadge');
  const modalServicePrice = document.getElementById('modalServicePrice');
  const modalServiceOldPrice = document.getElementById('modalServiceOldPrice');
  const modalServiceDesc = document.getElementById('modalServiceDesc');
  const planDurationTabs = document.getElementById('planDurationTabs');
  const addToCartBtn = document.getElementById('addToCartBtn');
  const modalWhatsAppBuyBtn = document.getElementById('modalWhatsAppBuyBtn');

  // Other Modals
  const offersModal = document.getElementById('offersModal');
  const closeOffersModal = document.getElementById('closeOffersModal');

  const faqModal = document.getElementById('faqModal');
  const closeFaqModal = document.getElementById('closeFaqModal');

  const contactModal = document.getElementById('contactModal');
  const closeContactModal = document.getElementById('closeContactModal');

  const termsModal = document.getElementById('termsModal');
  const closeTermsModal = document.getElementById('closeTermsModal');
  const termsModalTitle = document.getElementById('termsModalTitle');

  const loginModal = document.getElementById('loginModal');
  const closeLoginModal = document.getElementById('closeLoginModal');
  const loginBtn = document.getElementById('loginBtn');
  const loginBtnText = document.getElementById('loginBtnText');
  const mDrawerLoginBtn = document.getElementById('mDrawerLoginBtn');

  // Chat
  const chatBtn = document.getElementById('chatBtn');
  const chatDialog = document.getElementById('chatDialog');
  const closeChatDialog = document.getElementById('closeChatDialog');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatMessages = document.getElementById('chatMessages');
  const chatChips = document.getElementById('chatChips');

  // Hero interactive CTAs
  const browseSubsBtn = document.getElementById('browseSubsBtn');
  const heroPricePill = document.getElementById('heroPricePill');
  const securityBadge = document.getElementById('securityBadge');

  // ========================================================
  // 1. Toast Notification System
  // ========================================================
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('active');
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 3200);
  }

  // ========================================================
  // 2. Mobile Drawer Controls
  // ========================================================
  function toggleMobileDrawer(open) {
    if (!mobileDrawer || !mobileDrawerBackdrop) return;
    if (open) {
      mobileDrawer.classList.add('active');
      mobileDrawerBackdrop.classList.add('active');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      if (menuToggleBtn) menuToggleBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('active');
      mobileDrawerBackdrop.classList.remove('active');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      if (menuToggleBtn) menuToggleBtn.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('active');
      toggleMobileDrawer(!isOpen);
    });
  }

  if (closeMobileDrawer) {
    closeMobileDrawer.addEventListener('click', () => toggleMobileDrawer(false));
  }

  if (mobileDrawerBackdrop) {
    mobileDrawerBackdrop.addEventListener('click', () => toggleMobileDrawer(false));
  }

  // Mobile Links Handlers
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      toggleMobileDrawer(false);
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        handleNavTarget(targetId.substring(1));
      }
    });
  });

  // ========================================================
  // 3. Search and Live Filtering
  // ========================================================
  function handleSearch(query) {
    const clean = query.trim().toLowerCase();
    const cards = cardsGrid ? cardsGrid.querySelectorAll('.service-card') : [];
    let matchCount = 0;

    cards.forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const nameAr = (card.dataset.nameAr || '').toLowerCase();
      const desc = card.querySelector('.service-desc')?.textContent.toLowerCase() || '';

      if (!clean || name.includes(clean) || nameAr.includes(clean) || desc.includes(clean)) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResultsMsg) {
      noResultsMsg.style.display = matchCount === 0 ? 'block' : 'none';
    }

    if (clearSearchBtn) {
      clearSearchBtn.style.display = clean.length > 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (mobileSearchInput) mobileSearchInput.value = val;
      handleSearch(val);
    });
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (searchInput) searchInput.value = val;
      handleSearch(val);
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (mobileSearchInput) mobileSearchInput.value = '';
      handleSearch('');
      if (searchInput) searchInput.focus();
    });
  }

  if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (mobileSearchInput) mobileSearchInput.value = '';
      handleSearch('');
    });
  }

  // ========================================================
  // 4. Navigation Links & Modals
  // ========================================================
  function handleNavTarget(target) {
    if (target === 'offers') {
      openModal(offersModal);
    } else if (target === 'faq') {
      openModal(faqModal);
    } else if (target === 'contact') {
      openModal(contactModal);
    } else if (target === 'subscriptions') {
      const sec = document.getElementById('subscriptions');
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
    } else if (target === '' || target === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        handleNavTarget(href.substring(1));
      } else if (href === '#') {
        e.preventDefault();
        handleNavTarget('home');
      }

      navLinks.forEach(l => {
        l.classList.remove('active');
        const ind = l.querySelector('.active-indicator');
        if (ind) ind.remove();
      });

      link.classList.add('active');
      const indicator = document.createElement('div');
      indicator.className = 'active-indicator';
      link.appendChild(indicator);
    });
  });

  // Footer Links
  const footerContactBtn = document.getElementById('footerContactBtn');
  const footerFaqBtn = document.getElementById('footerFaqBtn');
  const footerPrivacyBtn = document.getElementById('footerPrivacyBtn');
  const footerTermsBtn = document.getElementById('footerTermsBtn');

  if (footerContactBtn) footerContactBtn.addEventListener('click', () => openModal(contactModal));
  if (footerFaqBtn) footerFaqBtn.addEventListener('click', () => openModal(faqModal));
  if (footerPrivacyBtn) {
    footerPrivacyBtn.addEventListener('click', () => {
      if (termsModalTitle) termsModalTitle.textContent = 'سياسة الخصوصية وحماية البيانات';
      openModal(termsModal);
    });
  }
  if (footerTermsBtn) {
    footerTermsBtn.addEventListener('click', () => {
      if (termsModalTitle) termsModalTitle.textContent = 'الشروط والأحكام والضمان الذهبي';
      openModal(termsModal);
    });
  }

  // Hero CTAs
  if (browseSubsBtn) {
    browseSubsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const sec = document.getElementById('subscriptions');
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (heroPricePill) {
    heroPricePill.addEventListener('click', () => {
      const ytCard = document.querySelector('[data-service="youtube-premium"]');
      if (ytCard) {
        ytCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        ytCard.style.boxShadow = '0 0 0 4px #2563eb, 0 12px 28px rgba(37,99,235,0.3)';
        setTimeout(() => {
          ytCard.style.boxShadow = '';
        }, 2000);
      }
      showToast('اشتراك YouTube Premium يبدأ من 18 درهم فقط 🔥');
    });
  }

  if (securityBadge) {
    securityBadge.addEventListener('click', () => {
      if (termsModalTitle) termsModalTitle.textContent = 'ضمان PromoSub الذهبي (100% أصلي)';
      openModal(termsModal);
    });
  }

  // ========================================================
  // 5. Generic Modal Helper Functions
  // ========================================================
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Close modals on clicking overlay or close buttons
  [
    { modal: cartModal, close: closeCartModal },
    { modal: checkoutModal, close: closeCheckoutModal },
    { modal: serviceModal, close: closeServiceModal },
    { modal: offersModal, close: closeOffersModal },
    { modal: faqModal, close: closeFaqModal },
    { modal: contactModal, close: closeContactModal },
    { modal: termsModal, close: closeTermsModal },
    { modal: loginModal, close: closeLoginModal }
  ].forEach(pair => {
    if (pair.close) {
      pair.close.addEventListener('click', () => closeModal(pair.modal));
    }
    if (pair.modal) {
      pair.modal.addEventListener('click', (e) => {
        if (e.target === pair.modal) closeModal(pair.modal);
      });
    }
  });

  // ESC key closes all active modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active, .cart-drawer-overlay.active').forEach(m => closeModal(m));
      toggleMobileDrawer(false);
      if (chatDialog) chatDialog.classList.remove('active');
    }
  });

  // ========================================================
  // 6. Service Details Modal & Plan Selector
  // ========================================================
  function calculatePlanPrice(basePrice, multiplier) {
    return Math.round(basePrice * multiplier);
  }

  function updatePlanTabsPricing(basePrice) {
    const p1 = calculatePlanPrice(basePrice, 1);
    const p3 = calculatePlanPrice(basePrice, 2.7);
    const p6 = calculatePlanPrice(basePrice, 5.1);
    const p12 = calculatePlanPrice(basePrice, 9.0);

    const el1 = document.getElementById('plan1MoPrice');
    const el3 = document.getElementById('plan3MoPrice');
    const el6 = document.getElementById('plan6MoPrice');
    const el12 = document.getElementById('plan12MoPrice');

    if (el1) el1.textContent = `${p1} درهم`;
    if (el3) el3.textContent = `${p3} درهم`;
    if (el6) el6.textContent = `${p6} درهم`;
    if (el12) el12.textContent = `${p12} درهم`;
  }

  function selectPlanTab(tab) {
    if (!tab) return;
    document.querySelectorAll('.plan-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    state.selectedPlanMonths = parseInt(tab.dataset.months, 10);
    state.selectedPlanMultiplier = parseFloat(tab.dataset.mult);

    if (state.currentViewingService) {
      const calc = calculatePlanPrice(state.currentViewingService.basePrice, state.selectedPlanMultiplier);
      if (modalServicePrice) modalServicePrice.textContent = `${calc} درهم`;
      
      if (state.selectedPlanMonths > 1 && modalServiceOldPrice) {
        const fullPrice = state.currentViewingService.basePrice * state.selectedPlanMonths;
        modalServiceOldPrice.textContent = `${fullPrice} درهم`;
        modalServiceOldPrice.style.display = 'inline';
      } else if (modalServiceOldPrice) {
        modalServiceOldPrice.style.display = 'none';
      }
    }
  }

  document.querySelectorAll('.plan-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const targetTab = e.target.closest('.plan-tab');
      if (targetTab) selectPlanTab(targetTab);
    });
  });

  // Opening Service Modal on Card Click
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const sId = card.dataset.service;
      const service = state.services.find(s => s.id === sId);
      if (!service) return;

      state.currentViewingService = service;
      if (modalServiceIcon) modalServiceIcon.src = service.icon;
      if (modalServiceTitle) modalServiceTitle.textContent = service.name;
      if (modalServiceDesc) modalServiceDesc.textContent = service.desc;

      if (modalServiceBadge) {
        if (service.badge) {
          modalServiceBadge.textContent = service.badge;
          modalServiceBadge.style.display = 'inline-block';
        } else {
          modalServiceBadge.style.display = 'none';
        }
      }

      updatePlanTabsPricing(service.basePrice);

      // Default to 1 month tab
      const firstTab = document.querySelector('.plan-tab[data-months="1"]');
      selectPlanTab(firstTab);

      openModal(serviceModal);
    });
  });

  // Add To Cart from Service Modal
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      if (!state.currentViewingService) return;
      const s = state.currentViewingService;
      const price = calculatePlanPrice(s.basePrice, state.selectedPlanMultiplier);
      const planLabel = state.selectedPlanMonths === 1 ? 'شهر واحد' : `${state.selectedPlanMonths} أشهر`;

      addToCart({
        id: `${s.id}-${state.selectedPlanMonths}`,
        serviceId: s.id,
        name: s.name,
        nameAr: s.nameAr,
        icon: s.icon,
        planMonths: state.selectedPlanMonths,
        planLabel: planLabel,
        priceNum: price
      });

      closeModal(serviceModal);
    });
  }

  // Direct WhatsApp Buy from Service Modal
  if (modalWhatsAppBuyBtn) {
    modalWhatsAppBuyBtn.addEventListener('click', () => {
      if (!state.currentViewingService) return;
      const s = state.currentViewingService;
      const price = calculatePlanPrice(s.basePrice, state.selectedPlanMultiplier);
      const planLabel = state.selectedPlanMonths === 1 ? 'شهر واحد' : `${state.selectedPlanMonths} أشهر`;
      const msg = encodeURIComponent(`مرحباً PromoSub! أود شراء اشتراك "${s.name}" لمدة (${planLabel}) بسعر ${price} درهم. هل التفعيل متاح فوراً؟`);
      window.open(`https://wa.me/212642394756?text=${msg}`, '_blank');
    });
  }

  // ========================================================
  // 7. Cart System (Add, Stepper, Coupons, Calculations)
  // ========================================================
  function addToCart(item) {
    const existing = state.cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();
    if (typeof triggerConfetti === 'function') triggerConfetti();
    showToast(`تمت إضافة ${item.name} (${item.planLabel}) إلى السلة 🛍️`);
  }

  function updateItemQty(id, delta) {
    const item = state.cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      state.cart = state.cart.filter(i => i.id !== id);
    }
    updateCartUI();
  }

  function removeFromCart(id) {
    state.cart = state.cart.filter(i => i.id !== id);
    updateCartUI();
    showToast('تم حذف العنصر من السلة');
  }

  function calculateCartTotals() {
    let subtotal = 0;
    let totalItems = 0;
    state.cart.forEach(item => {
      subtotal += item.priceNum * item.quantity;
      totalItems += item.quantity;
    });

    const discountAmount = Math.round(subtotal * (state.discountPercent / 100));
    const finalTotal = Math.max(0, subtotal - discountAmount);

    return { subtotal, discountAmount, finalTotal, totalItems };
  }

  function updateCartUI() {
    const { subtotal, discountAmount, finalTotal, totalItems } = calculateCartTotals();

    // Badges and Titles
    if (cartBadge) cartBadge.textContent = totalItems;
    if (cartCountTitle) cartCountTitle.textContent = totalItems;
    if (cartSubtotal) cartSubtotal.textContent = `${subtotal} درهم`;
    if (cartTotal) cartTotal.textContent = `${finalTotal} درهم`;
    if (checkoutTotalAmount) checkoutTotalAmount.textContent = `${finalTotal} درهم`;

    if (state.discountPercent > 0 && discountLine && cartDiscount) {
      discountLine.style.display = 'flex';
      cartDiscount.textContent = `-${discountAmount} درهم`;
    } else if (discountLine) {
      discountLine.style.display = 'none';
    }

    if (checkoutBtn) checkoutBtn.disabled = state.cart.length === 0;

    // Render items list
    if (!cartItemsContainer) return;

    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-icon">🛒</div>
          <p>سلتك فارغة حالياً</p>
          <span class="empty-sub">اختر من باقات واشتراكات PromoSub واستمتع بأفضل الأسعار الرسمية</span>
        </div>
      `;
      if (whatsappCheckoutBtn) whatsappCheckoutBtn.style.display = 'none';
    } else {
      let html = '<div class="cart-items-list">';
      state.cart.forEach(item => {
        html += `
          <div class="cart-item-row" data-id="${item.id}">
            <div class="cart-item-info">
              <img src="${item.icon}" alt="${item.name}" class="cart-item-img">
              <div>
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-plan">${item.planLabel}</div>
                <div class="cart-item-price">${item.priceNum * item.quantity} درهم</div>
              </div>
            </div>
            <div class="cart-item-actions">
              <button class="qty-btn qty-minus" data-id="${item.id}">−</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
              <button class="cart-item-remove" data-id="${item.id}" title="إزالة">&times;</button>
            </div>
          </div>
        `;
      });
      html += '</div>';
      cartItemsContainer.innerHTML = html;

      // Prepare WhatsApp Checkout link
      if (whatsappCheckoutBtn) {
        let msg = `مرحباً PromoSub! أود إتمام طلب السلة:\n`;
        state.cart.forEach(i => {
          msg += `• ${i.name} (${i.planLabel}) × ${i.quantity} = ${i.priceNum * i.quantity} درهم\n`;
        });
        msg += `الإجمالي: ${finalTotal} درهم\nأرجو تزويدي برقم الحساب وبدء التفعيل.`;
        whatsappCheckoutBtn.href = `https://wa.me/212642394756?text=${encodeURIComponent(msg)}`;
        whatsappCheckoutBtn.style.display = 'flex';
      }

      // Attach Stepper & Remove Handlers
      cartItemsContainer.querySelectorAll('.qty-minus').forEach(b => {
        b.addEventListener('click', () => updateItemQty(b.dataset.id, -1));
      });
      cartItemsContainer.querySelectorAll('.qty-plus').forEach(b => {
        b.addEventListener('click', () => updateItemQty(b.dataset.id, 1));
      });
      cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(b => {
        b.addEventListener('click', () => removeFromCart(b.dataset.id));
      });
    }
  }

  // Open Cart Drawer
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      openModal(cartModal);
    });
  }

  // Apply Coupon
  if (applyCouponBtn && couponInput) {
    applyCouponBtn.addEventListener('click', () => {
      const code = couponInput.value.trim().toUpperCase();
      if (code === 'PROMO10' || code === 'SAVE10') {
        state.discountPercent = 10;
        state.appliedCoupon = code;
        updateCartUI();
        showToast('تم تطبيق كود الخصم بنجاح! وفرت 10% 🎉');
      } else if (!code) {
        showToast('يرجى إدخال كود الخصم');
      } else {
        showToast('عذراً، هذا الكود غير صالح أو منتهي');
      }
    });
  }

  // Proceed to Checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      closeModal(cartModal);
      openModal(checkoutModal);
    });
  }

  // Checkout Form Submission
  window.handleOrderSubmit = function() {
    const name = document.getElementById('orderName')?.value || 'العميل';
    const phone = document.getElementById('orderPhone')?.value || '';
    const selectedPay = document.querySelector('input[name="paymethod"]:checked')?.value;
    const payMethodName = selectedPay === 'attijariwafa' ? 'Attijariwafa Bank (التجاري وفا بنك)' : 'Cash Plus (كاش بلوس)';
    const { finalTotal } = calculateCartTotals();

    showToast(`شكراً لك يا ${name}! تم تسجيل طلبك بنجاح عبر ${payMethodName} بمبلغ ${finalTotal} درهم 🎉`);
    
    setTimeout(() => {
      closeModal(checkoutModal);
      state.cart = [];
      updateCartUI();
      // WhatsApp notification
      const waMsg = encodeURIComponent(`مرحباً PromoSub! أود تأكيد طلبي باسم: ${name}\nرقم الهاتف: ${phone}\nالمبلغ الإجمالي: ${finalTotal} درهم\nطريقة الدفع: ${payMethodName}\nيرجى إرسال بيانات التحويل لتفعيل الاشتراك فوراً.`);
      window.open(`https://wa.me/212642394756?text=${waMsg}`, '_blank');
    }, 1200);
  };

  // Payment Option selection radio styling
  document.querySelectorAll('.pay-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.pay-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  // Bundle Add To Cart
  document.querySelectorAll('.bundle-add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const bName = btn.dataset.name;
      const bPrice = parseInt(btn.dataset.price, 10);
      addToCart({
        id: `bundle-${btn.dataset.bundle}`,
        serviceId: 'bundle',
        name: bName,
        nameAr: bName,
        icon: 'assets/hero/stats_gift_2x.png',
        planMonths: 1,
        planLabel: 'باقة توفير خاصة',
        priceNum: bPrice
      });
      closeModal(offersModal);
    });
  });

  // FAQ Accordion Toggle
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('active');
      const icon = q.querySelector('.faq-toggle-icon');

      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        const ans = i.querySelector('.faq-answer');
        const ic = i.querySelector('.faq-toggle-icon');
        if (ans) ans.style.display = 'none';
        if (ic) ic.textContent = '+';
      });

      if (!isOpen) {
        item.classList.add('active');
        const ans = item.querySelector('.faq-answer');
        if (ans) ans.style.display = 'block';
        if (icon) icon.textContent = '−';
      }
    });
  });

  // Contact Form Submission
  window.handleContactSubmit = function() {
    showToast('تم إرسال رسالتك بنجاح! سيتواصل معك الدعم الفني خلال دقائق ✨');
    closeModal(contactModal);
  };

  // ========================================================
  // 8. Auth / Login Engine
  // ========================================================
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const groupName = document.getElementById('groupName');
  const authModalTitle = document.getElementById('authModalTitle');
  const authSubmitBtn = document.getElementById('authSubmitBtn');

  if (tabLogin && tabRegister) {
    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      if (groupName) groupName.style.display = 'none';
      if (authModalTitle) authModalTitle.textContent = 'تسجيل الدخول إلى PromoSub';
      if (authSubmitBtn) authSubmitBtn.textContent = 'دخول';
    });

    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      if (groupName) groupName.style.display = 'flex';
      if (authModalTitle) authModalTitle.textContent = 'إنشاء حساب جديد في PromoSub';
      if (authSubmitBtn) authSubmitBtn.textContent = 'إنشاء الحساب';
    });
  }

  function openAuthModal() {
    toggleMobileDrawer(false);
    openModal(loginModal);
  }

  if (loginBtn) loginBtn.addEventListener('click', openAuthModal);
  if (mDrawerLoginBtn) mDrawerLoginBtn.addEventListener('click', openAuthModal);

  window.handleAuthSubmit = function() {
    const isReg = tabRegister && tabRegister.classList.contains('active');
    const name = document.getElementById('authName')?.value || 'محمد علي';
    state.isLoggedIn = true;
    state.currentUser = name;

    if (loginBtnText) loginBtnText.textContent = `حسابي (${name.split(' ')[0]}) 👋`;
    if (mDrawerLoginBtn) {
      mDrawerLoginBtn.innerHTML = `<span>حسابي: ${name}</span>`;
    }

    showToast(isReg ? `أهلاً بك يا ${name}! تم إنشاء حسابك بنجاح 🎉` : `مرحباً بك مجدداً يا ${name} ✨`);
    closeModal(loginModal);
  };

  // ========================================================
  // 9. Interactive AI Live Chat Assistant
  // ========================================================
  if (chatBtn) {
    chatBtn.addEventListener('click', () => {
      chatDialog.classList.toggle('active');
      if (chatDialog.classList.contains('active')) {
        chatInput?.focus();
      }
    });
  }

  if (closeChatDialog) {
    closeChatDialog.addEventListener('click', () => {
      chatDialog.classList.remove('active');
    });
  }

  function addBotMessage(text) {
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-msg bot';
    botMsg.textContent = text;
    chatMessages.appendChild(botMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserChat(query) {
    if (!query) return;

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user';
    userMsg.textContent = query;
    chatMessages.appendChild(userMsg);
    if (chatInput) chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate smart bot response based on keywords
    setTimeout(() => {
      const q = query.toLowerCase();
      if (q.includes('تسليم') || q.includes('تفعيل') || q.includes('استلام')) {
        addBotMessage('التسليم فوري وتلقائي تماماً! بعد إتمام الدفع يصلك كود التفعيل أو الدعوة الرسمية على الواتساب والإيميل في أقل من 5 دقائق ⚡');
      } else if (q.includes('ضمان') || q.includes('مشكلة') || q.includes('استرجاع')) {
        addBotMessage('نعم بكل تأكيد! جميع اشتراكات متجر PromoSub رسمية 100% ومغطاة بضمان ذهبي كامل طوال المدة. في حال حدوث أي انقطاع نستبدل الحساب فوراً 🛡️');
      } else if (q.includes('يوتيوب') || q.includes('youtube')) {
        addBotMessage('يوتيوب بريميوم متوفر لدينا بـ 18 درهم فقط! بدون إعلانات، تشغيل بالخلفية وتفعيل رسمي على إيميلك الشخصي مباشرة 🎬');
      } else if (q.includes('دفع') || q.includes('cash') || q.includes('كاش') || q.includes('bank') || q.includes('بنك') || q.includes('attijari') || q.includes('تجاري')) {
        addBotMessage('طرق الدفع المتوفرة والمعتمدة لدينا حصرياً هي: Cash Plus (كاش بلوس) والتحويل البنكي عبر Attijariwafa Bank (التجاري وفا بنك) مع تأكيد فوري ومعالجة آمنة 100% 💳');
      } else if (q.includes('خصم') || q.includes('كود') || q.includes('عرض')) {
        addBotMessage('يسعدنا ذلك! استخدم كود الخصم (PROMO10) في سلة المشتريات لتحصل على خصم فوري 10% على أي اشتراك 🎁');
      } else {
        addBotMessage('أهلاً بك! فريق الدعم الفني جاهز لمساعدتك وإتمام طلبك في ثوانٍ. يمكنك أيضاً مراسلتنا مباشرة على واتساب المتجر وسنرد عليك فوراً ✨');
      }
    }, 700);
  }

  if (chatSendBtn) {
    chatSendBtn.addEventListener('click', () => {
      handleUserChat(chatInput.value.trim());
    });
  }

  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserChat(chatInput.value.trim());
    });
  }

  // Chat Quick Suggestion Chips
  if (chatChips) {
    chatChips.querySelectorAll('.chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        handleUserChat(btn.dataset.query);
      });
    });
  }

  // ========================================================
  // 10. Subtle Interactive 3D Tilt on Desktop
  // ========================================================
  const heroScene = document.getElementById('hero3DScene');
  if (heroScene && window.innerWidth > 1024) {
    window.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 55;
      const y = (window.innerHeight / 2 - e.pageY) / 55;
      heroScene.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });

    window.addEventListener('mouseleave', () => {
      heroScene.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
  }

  // ========================================================
  // 11. Luxury Interactive Confetti Particles
  // ========================================================
  window.triggerConfetti = function() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#2563eb', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#00b4d8', '#7000ff'];
    for (let i = 0; i < 65; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.4,
        w: Math.random() * 8 + 4,
        h: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 5 + 3,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10
      });
    }

    let frame = 0;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      frame++;
      if (frame < 80) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(render);
  };

  // ========================================================
  // 12. Live Social Proof Purchase Notification Cycle
  // ========================================================
  const socialProofMessages = [
    { title: 'اشترى فهد من الرياض اشتراك YouTube Premium (سنة كاملة)', time: 'قبل دقيقة • تم التفعيل فوراً بضمان 100%' },
    { title: 'تم تفعيل اشتراك Netflix 4K للعميل عمر بنجاح', time: 'قبل دقيقتين • تسليم فوري وتلقائي' },
    { title: 'اشترى عبد الله من جدة اشتراك Gemini Pro مع الضمان الذهبي', time: 'قبل 4 دقائق • حساب رسمي معتمد' },
    { title: 'اشترت سارة من دبي اشتراك Canva Pro لمدة سنة', time: 'قبل 6 دقائق • وفرت 25% من السعر' },
    { title: 'تم تجديد اشتراك Spotify Premium للعميل فيصل', time: 'قبل 8 دقائق • تفعيل فوري على إيميله الشخصي' }
  ];

  const spToast = document.getElementById('socialProofToast');
  const spTitle = document.getElementById('spTitle');
  const spTime = document.getElementById('spTime');
  let spIndex = 0;

  function cycleSocialProof() {
    if (!spToast || !spTitle || !spTime) return;
    const item = socialProofMessages[spIndex];
    spTitle.textContent = item.title;
    spTime.textContent = item.time;
    spToast.classList.add('active');

    setTimeout(() => {
      spToast.classList.remove('active');
    }, 4500);

    spIndex = (spIndex + 1) % socialProofMessages.length;
  }

  // Start social proof after 3.5 seconds, then repeat every 11 seconds
  setTimeout(() => {
    cycleSocialProof();
    setInterval(cycleSocialProof, 11000);
  }, 3500);

  // ========================================================
  // 13. Offers Modal Live Countdown Timer
  // ========================================================
  const offersTimerEl = document.getElementById('offersTimer');
  let remainingSeconds = 4 * 3600 + 32 * 60 + 15; // 4 hours 32 mins 15 secs

  function updateOffersTimer() {
    if (!offersTimerEl) return;
    remainingSeconds--;
    if (remainingSeconds < 0) remainingSeconds = 12 * 3600;
    const h = String(Math.floor(remainingSeconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, '0');
    const s = String(remainingSeconds % 60).padStart(2, '0');
    offersTimerEl.textContent = `${h} : ${m} : ${s}`;
  }
  setInterval(updateOffersTimer, 1000);

});

