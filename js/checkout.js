// Checkout Page Script
class CheckoutPage {
  constructor() {
    this.init();
  }

  init() {
    this.renderOrderSummary();
    this.setupFormValidation();
    this.setupEventListeners();
  }

  // Render order summary
  renderOrderSummary() {
    const orderItems = document.getElementById("order-items");
    const orderTotal = document.getElementById("order-total");

    if (!orderItems || !orderTotal || !window.cartManager) return;

    const cart = window.cartManager.cart;

    if (cart.length === 0) {
      // Redirect to cart if empty
      window.location.href = "cart.html";
      return;
    }

    // Render order items
    orderItems.innerHTML = cart
      .map(
        (item) => `
            <div class="order-item">
                <div class="order-item-details">
                    <div class="order-item-image">
                        <img src="${item.image}" alt="${
          item.title
        }" onerror="this.src='images/game-placeholder.jpg'">
                    </div>
                    <div class="order-item-info">
                        <h4>${item.title}</h4>
                        <span class="order-item-platform ${item.platform.toLowerCase()}">${
          item.platform
        }</span>
                        <div class="order-item-quantity">Quantity: ${
                          item.quantity
                        }</div>
                    </div>
                </div>
                <div class="order-item-price">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
            </div>
        `
      )
      .join("");

    // Calculate totals
    const subtotal = window.cartManager.getCartTotal();
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    // Render order total
    orderTotal.innerHTML = `
            <div class="total-item">
                <span class="total-label">Subtotal</span>
                <span class="total-value">$${subtotal.toFixed(2)}</span>
            </div>
            <div class="total-item">
                <span class="total-label">Tax (10%)</span>
                <span class="total-value">$${tax.toFixed(2)}</span>
            </div>
            <div class="total-item">
                <span class="total-label">Total</span>
                <span class="total-final">$${total.toFixed(2)}</span>
            </div>
        `;
  }

  // Setup form validation
  setupFormValidation() {
    const form = document.getElementById("checkout-form");
    if (!form) return;

    // Real-time validation
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });

      input.addEventListener("input", () => {
        this.clearFieldError(input);
      });
    });
  }

  // Setup event listeners
  setupEventListeners() {
    const form = document.getElementById("checkout-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });
  }

  // Handle form submission
  async handleFormSubmission(form) {
    // Validate all fields
    const isValid = this.validateForm(form);
    if (!isValid) {
      this.showNotification("Please fix the errors in the form.", "error");
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector(".place-order-btn");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Processing...";
    submitBtn.disabled = true;

    try {
      // Simulate order processing
      await this.processOrder(form);

      // Clear cart
      if (window.cartManager) {
        window.cartManager.clearCart();
      }

      // Show success page
      this.showSuccessPage();
    } catch (error) {
      this.showNotification(
        "Order processing failed. Please try again.",
        "error"
      );
    } finally {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  // Validate form
  validateForm(form) {
    const fields = [
      { id: "firstName", label: "First Name", required: true, minLength: 2 },
      { id: "lastName", label: "Last Name", required: true, minLength: 2 },
      { id: "email", label: "Email", required: true, type: "email" },
    ];

    let isValid = true;

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      if (!input) return;

      if (!this.validateField(input, field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  // Validate individual field
  validateField(input, fieldConfig = null) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = "";

    // Remove existing error
    this.clearFieldError(input);

    // Required validation
    if (fieldConfig?.required && !value) {
      isValid = false;
      errorMessage = `${fieldConfig.label} is required.`;
    }

    // Min length validation
    if (fieldConfig?.minLength && value.length < fieldConfig.minLength) {
      isValid = false;
      errorMessage = `${fieldConfig.label} must be at least ${fieldConfig.minLength} characters.`;
    }

    // Email validation
    if (fieldConfig?.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = "Please enter a valid email address.";
      }
    }

    // Pattern validation
    if (fieldConfig?.pattern && value) {
      if (!fieldConfig.pattern.test(value)) {
        isValid = false;
        errorMessage = `Please enter a valid ${fieldConfig.label.toLowerCase()}.`;
      }
    }

    // Show error if invalid
    if (!isValid) {
      this.showFieldError(input, errorMessage);
    }

    return isValid;
  }

  // Show field error
  showFieldError(input, message) {
    input.classList.add("error");

    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;

    input.parentNode.appendChild(errorDiv);
  }

  // Clear field error
  clearFieldError(input) {
    input.classList.remove("error");

    const errorDiv = input.parentNode.querySelector(".error-message");
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  // Process order
  async processOrder(form) {
    const formData = new FormData(form);
    const orderData = {
      customer: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
      },
      payment: {
        method: formData.get("paymentMethod"),
        cardNumber: formData.get("cardNumber"),
        expiryDate: formData.get("expiryDate"),
        cvv: formData.get("cvv"),
        cardName: formData.get("cardName"),
      },
      items: window.cartManager ? window.cartManager.cart : [],
      total: window.cartManager ? window.cartManager.getCartTotal() : 0,
    };

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Order processed:", orderData);
        resolve();
      }, 2000);
    });
  }

  // Show success page
  showSuccessPage() {
    const main = document.querySelector("main");
    if (!main) return;

    main.innerHTML = `
            <div class="container">
                <div class="checkout-success">
                    <div class="success-icon">✅</div>
                    <h2>Order Placed Successfully!</h2>
                    <p>Thank you for your purchase. You will receive a confirmation email shortly with your order details and download instructions.</p>
                    <a href="index.html" class="back-to-home-btn">Back to Home</a>
                </div>
            </div>
        `;
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
      }, 4000);
    }
  }
}

// Initialize checkout page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new CheckoutPage();
});
