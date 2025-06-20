// Cart Management System
class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.init();
  }

  // Load cart from localStorage
  loadCart() {
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.updateCartCount();
  }

  // Initialize cart manager
  init() {
    this.updateCartCount();
    this.setupEventListeners();
  }

  // Add item to cart
  addToCart(game) {
    const existingItem = this.cart.find((item) => item.id === game.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({
        id: game.id,
        title: game.title,
        price: game.price,
        originalPrice: game.originalPrice,
        image: game.image,
        platform: game.platform,
        quantity: 1,
      });
    }

    this.saveCart();
    this.showNotification(`${game.title} added to cart!`);
  }

  // Remove item from cart
  removeFromCart(gameId) {
    this.cart = this.cart.filter((item) => item.id !== gameId);
    this.saveCart();
    this.showNotification("Item removed from cart");
  }

  // Update item quantity
  updateQuantity(gameId, quantity) {
    const item = this.cart.find((item) => item.id === gameId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(gameId);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  // Get cart total
  getCartTotal() {
    return this.cart.reduce((total, item) => {
      const price = item.originalPrice || item.price;
      return total + price * item.quantity;
    }, 0);
  }

  // Get cart items count
  getCartItemsCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Clear cart
  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  // Update cart count in header
  updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = this.getCartItemsCount();
    }
  }

  // Show notification
  showNotification(message, type = "success") {
    const notification = document.getElementById("notification");
    if (notification) {
      notification.textContent = message;
      notification.className = `notification ${type}`;
      notification.classList.add("show");

      setTimeout(() => {
        notification.classList.remove("show");
      }, 3000);
    }
  }

  // Setup event listeners
  setupEventListeners() {
    // Listen for add to cart events
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart-btn")) {
        e.preventDefault();
        const gameId = e.target.dataset.gameId;
        const game = this.getGameById(gameId);
        if (game) {
          this.addToCart(game);
        }
      }
    });

    // Listen for quantity change events
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("quantity-btn")) {
        e.preventDefault();
        const gameId = e.target.dataset.gameId;
        const action = e.target.dataset.action;
        const currentQuantity = parseInt(e.target.dataset.quantity || 1);

        let newQuantity = currentQuantity;
        if (action === "increase") {
          newQuantity = currentQuantity + 1;
        } else if (action === "decrease") {
          newQuantity = currentQuantity - 1;
        }

        this.updateQuantity(gameId, newQuantity);

        // Update the quantity display
        const quantityDisplay = document.querySelector(
          `[data-game-id="${gameId}"] .quantity-display`
        );
        if (quantityDisplay) {
          quantityDisplay.textContent = newQuantity;
        }

        // Update cart page if on cart page
        if (window.location.pathname.includes("cart.html")) {
          this.renderCartPage();
        }
      }
    });

    // Listen for remove item events
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item-btn")) {
        e.preventDefault();
        const gameId = e.target.dataset.gameId;
        this.removeFromCart(gameId);

        // Update cart page if on cart page
        if (window.location.pathname.includes("cart.html")) {
          this.renderCartPage();
        }
      }
    });
  }

  // Get game by ID (placeholder - should be replaced with actual game data)
  getGameById(gameId) {
    // This should be replaced with actual game data from JSON
    // For now, return a placeholder
    return {
      id: gameId,
      title: "Game Title",
      price: 59.99,
      image: "images/game-placeholder.jpg",
      platform: "PC",
    };
  }

  // Render cart page
  renderCartPage() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartSummaryContainer = document.getElementById("cart-summary");
    const emptyCartContainer = document.getElementById("empty-cart");

    if (!cartItemsContainer) return;

    if (this.cart.length === 0) {
      cartItemsContainer.style.display = "none";
      cartSummaryContainer.style.display = "none";
      emptyCartContainer.style.display = "block";
    } else {
      cartItemsContainer.style.display = "block";
      cartSummaryContainer.style.display = "block";
      emptyCartContainer.style.display = "none";

      this.renderCartItems(cartItemsContainer);
      this.renderCartSummary(cartSummaryContainer);
    }
  }

  // Render cart items
  renderCartItems(container) {
    container.innerHTML = `
            <div class="cart-items-header">
                <h2>Shopping Cart</h2>
                <span class="cart-items-count">${this.getCartItemsCount()} items</span>
            </div>
            ${this.cart
              .map(
                (item) => `
                <div class="cart-item" data-game-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <h3 class="cart-item-title">${item.title}</h3>
                        <span class="cart-item-platform ${item.platform.toLowerCase()}">${
                  item.platform
                }</span>
                        <div class="cart-item-price">
                            ${
                              item.originalPrice
                                ? `<span class="original">$${item.originalPrice.toFixed(
                                    2
                                  )}</span>`
                                : ""
                            }
                            $${item.price.toFixed(2)}
                        </div>
                    </div>
                    <div class="cart-item-quantity">
                        <div class="quantity-controls">
                            <button class="quantity-btn" data-game-id="${
                              item.id
                            }" data-action="decrease" data-quantity="${
                  item.quantity
                }" ${item.quantity <= 1 ? "disabled" : ""}>-</button>
                            <span class="quantity-display">${
                              item.quantity
                            }</span>
                            <button class="quantity-btn" data-game-id="${
                              item.id
                            }" data-action="increase" data-quantity="${
                  item.quantity
                }">+</button>
                        </div>
                    </div>
                    <div class="cart-item-total">
                        $${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div class="cart-item-remove">
                      <button class="remove-item-btn" data-game-id="${
                        item.id
                      }">Remove</button>
                    </div>
                </div>
              `
              )
              .join("")}
        `;
  }

  // Render cart summary
  renderCartSummary(container) {
    const subtotal = this.getCartTotal();
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    container.innerHTML = `
            <h2>Order Summary</h2>
            <div class="summary-item">
                <span class="summary-label">Subtotal</span>
                <span class="summary-value">$${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Tax (10%)</span>
                <span class="summary-value">$${tax.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Total</span>
                <span class="summary-total">$${total.toFixed(2)}</span>
            </div>
            <div class="cart-actions">
                <button class="checkout-btn" onclick="window.location.href='checkout.html'">Proceed to Checkout</button>
                <a href="catalog.html" class="continue-shopping-btn">Continue Shopping</a>
            </div>
        `;
  }
}

// Initialize cart manager
const cartManager = new CartManager();

// Export for use in other scripts
window.cartManager = cartManager;
