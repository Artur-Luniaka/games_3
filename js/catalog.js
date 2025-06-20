// Catalog Page Script
class CatalogPage {
  constructor() {
    this.games = [];
    this.init();
  }

  async init() {
    await this.loadGames();
    this.renderGames();
    this.setupEventListeners();
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

  // Render games grid
  renderGames() {
    const gamesGrid = document.getElementById("games-grid");
    if (!gamesGrid) return;

    if (this.games.length === 0) {
      gamesGrid.innerHTML = `
                <div class="games-loading">
                    <div class="loading-spinner"></div>
                    <p>Loading games...</p>
                </div>
            `;
      return;
    }

    // Limit to 9 games as specified
    const displayGames = this.games.slice(0, 9);

    gamesGrid.innerHTML = displayGames
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

  // Setup event listeners
  setupEventListeners() {
    // Handle add to cart button clicks
    document.addEventListener("click", (e) => {
      const addToCartBtn = e.target.closest(".add-to-cart-btn");
      if (addToCartBtn) {
        e.preventDefault(); // Stop the link navigation
        const gameId = addToCartBtn.dataset.gameId;
        const game = this.getGameById(gameId);
        if (game && window.cartManager) {
          window.cartManager.addToCart(game);
        }
      }
    });

    // Handle quick view button clicks
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("quick-view-btn")) {
        // Let the link work normally
        return;
      }
    });

    // Add hover effects for game cards
    document.addEventListener(
      "mouseenter",
      (e) => {
        if (e.target.closest(".game-card")) {
          const card = e.target.closest(".game-card");
          card.style.transform = "translateY(-10px)";
        }
      },
      true
    );

    document.addEventListener(
      "mouseleave",
      (e) => {
        if (e.target.closest(".game-card")) {
          const card = e.target.closest(".game-card");
          card.style.transform = "translateY(0)";
        }
      },
      true
    );
  }

  // Get game by ID
  getGameById(gameId) {
    return this.games.find((game) => game.id === gameId);
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

// Initialize catalog page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new CatalogPage();
});
