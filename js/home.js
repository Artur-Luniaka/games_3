// Home Page Script
class HomePage {
  constructor() {
    this.games = [];
    this.init();
  }

  async init() {
    await this.loadGames();
    this.renderFeaturedGames();
    this.setupContactForm();
    this.setupAnimations();
    this.setupAddToCartHandler();
  }

  // Load games from JSON
  async loadGames() {
    try {
      const response = await fetch("data/games.json");
      const data = await response.json();
      this.games = data.games;
    } catch (error) {
      console.error("Error loading games:", error);
      this.games = [];
    }
  }

  // Render featured games section
  renderFeaturedGames() {
    const featuredGamesContainer = document.getElementById("featured-games");
    if (!featuredGamesContainer) return;

    // Get featured games (first 6 games)
    const featuredGames = this.games.slice(0, 6);

    if (featuredGames.length === 0) {
      featuredGamesContainer.innerHTML = `
                <div class="games-loading">
                    <div class="loading-spinner"></div>
                    <p>Loading featured games...</p>
                </div>
            `;
      return;
    }

    featuredGamesContainer.innerHTML = featuredGames
      .map(
        (game) => `
            <a href="game-details.html?id=${game.id}" class="game-card-link">
                <div class="game-card ${this.getCardClass(game)}">
                    <div class="game-card-image">
                        <img src="${game.image}" alt="${
          game.title
        }" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="game-card-placeholder">${game.title}</div>
                        <div class="game-card-overlay">
                            <span class="quick-view-btn">View Details</span>
                        </div>
                    </div>
                    <div class="game-card-content">
                        <div class="game-card-header">
                            <h3 class="game-title">${game.title}</h3>
                            <span class="game-platform ${game.platform.toLowerCase()}">${
          game.platform
        }</span>
                        </div>
                        <div class="game-card-footer">
                            <div class="game-price">
                                ${
                                  game.originalPrice &&
                                  game.originalPrice > game.price
                                    ? `<span class="original-price">$${game.originalPrice.toFixed(
                                        2
                                      )}</span>`
                                    : ""
                                }
                                <span class="current-price">$${game.price.toFixed(
                                  2
                                )}</span>
                            </div>
                            <button class="add-to-cart-btn" data-game-id="${
                              game.id
                            }">
                                <i>🛒</i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </a>
        `
      )
      .join("");
  }

  // Get CSS class for game card based on tags
  getCardClass(game) {
    const classes = [];
    if (game.tags.includes("featured")) classes.push("featured");
    if (game.tags.includes("new")) classes.push("new");
    if (game.tags.includes("sale")) classes.push("sale");
    return classes.join(" ");
  }

  // Generate star rating HTML
  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      "★".repeat(fullStars) + (hasHalfStar ? "☆" : "") + "☆".repeat(emptyStars)
    );
  }

  // Format number with commas
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Setup contact form
  setupContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleContactForm(contactForm);
    });
  }

  // Add a separate handler for cart buttons to avoid conflicts
  setupAddToCartHandler() {
    document.getElementById("featured-games").addEventListener("click", (e) => {
      const addToCartBtn = e.target.closest(".add-to-cart-btn");
      if (addToCartBtn) {
        e.preventDefault(); // Stop the link navigation
        const gameId = addToCartBtn.dataset.gameId;
        const game = this.games.find((g) => g.id === gameId);
        if (game && window.cartManager) {
          window.cartManager.addToCart(game);
        }
      }
    });
  }

  // Handle contact form submission
  async handleContactForm(form) {
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Validate form
    if (!this.validateContactForm(name, email, message)) {
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      // Simulate form submission
      await this.simulateFormSubmission({ name, email, message });

      // Show success message
      this.showNotification(
        "Message sent successfully! We'll get back to you soon.",
        "success"
      );

      // Reset form
      form.reset();
    } catch (error) {
      this.showNotification(
        "Failed to send message. Please try again.",
        "error"
      );
    } finally {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  // Validate contact form
  validateContactForm(name, email, message) {
    if (!name || name.trim().length < 2) {
      this.showNotification(
        "Please enter a valid name (at least 2 characters).",
        "error"
      );
      return false;
    }

    if (!this.isValidEmail(email)) {
      this.showNotification("Please enter a valid email address.", "error");
      return false;
    }

    if (!message || message.trim().length < 10) {
      this.showNotification(
        "Please enter a message (at least 10 characters).",
        "error"
      );
      return false;
    }

    return true;
  }

  // Validate email format
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Simulate form submission
  simulateFormSubmission(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Contact form submitted:", data);
        resolve();
      }, 1500);
    });
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

  // Setup animations
  setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

// Initialize home page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new HomePage();
});
