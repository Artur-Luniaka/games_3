// Cart Page Script
class CartPage {
  constructor() {
    this.init();
  }

  init() {
    this.renderCartPage();
    this.setupEventListeners();
  }

  // Render cart page
  renderCartPage() {
    if (window.cartManager) {
      window.cartManager.renderCartPage();
    }
  }

  // Setup event listeners
  setupEventListeners() {
    // Listen for cart updates
    window.addEventListener("storage", (e) => {
      if (e.key === "cart") {
        this.renderCartPage();
      }
    });

    // Handle checkout button clicks
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("checkout-btn")) {
        e.preventDefault();
        this.handleCheckout();
      }
    });

    // Handle continue shopping button clicks
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("continue-shopping-btn")) {
        e.preventDefault();
        window.location.href = "catalog.html";
      }
    });

    // Handle browse games button clicks
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("browse-games-btn")) {
        e.preventDefault();
        window.location.href = "catalog.html";
      }
    });
  }

  // Handle checkout
  handleCheckout() {
    if (window.cartManager && window.cartManager.cart.length > 0) {
      window.location.href = "checkout.html";
    } else {
      this.showNotification(
        "Your cart is empty. Please add some games first.",
        "error"
      );
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
}

// Initialize cart page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new CartPage();
});
