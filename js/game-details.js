// Game Details Page Script
class GameDetailsPage {
  constructor() {
    this.games = [];
    this.currentGame = null;
    this.init();
  }

  async init() {
    await this.loadGames();
    this.loadGameDetails();
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

  // Load game details from URL parameter
  loadGameDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get("id");

    if (!gameId) {
      this.showError("Game not found");
      return;
    }

    this.currentGame = this.games.find((game) => game.id === gameId);

    if (!this.currentGame) {
      this.showError("Game not found");
      return;
    }

    this.renderGameDetails();
    this.renderRelatedGames();
  }

  // Render game details
  renderGameDetails() {
    const game = this.currentGame;

    // Set page title
    document.title = `${game.title} - SkillLootPlayground`;

    // Render hero section
    this.renderGameHero(game);

    // Render game info
    this.renderGameInfo(game);

    // Render purchase section
    this.renderPurchaseSection(game);
  }

  // Render game hero section
  renderGameHero(game) {
    const gameHero = document.getElementById("game-hero");
    if (!gameHero) return;

    gameHero.innerHTML = `
            <img src="${game.image}" alt="${
      game.title
    } background" class="game-hero-bg-img" onerror="this.style.display='none'">
            <div class="game-hero-content">
                <div class="game-hero-title-badge"><h1 class="game-hero-title">${
                  game.title
                }</h1></div>
                <div class="game-hero-subtitle-badge"><p class="game-hero-subtitle">${
                  game.genre
                } • ${game.platform}</p></div>
                <div class="game-hero-meta">
                    <div class="game-meta-item">
                        <i>⭐</i>
                        <span>${game.rating}/5</span>
                    </div>
                    <div class="game-meta-item">
                        <i>📅</i>
                        <span>${this.formatDate(game.releaseDate)}</span>
                    </div>
                    <div class="game-meta-item">
                        <i>🏢</i>
                        <span>${game.developer}</span>
                    </div>
                </div>
            </div>
        `;
  }

  // Render game info section
  renderGameInfo(game) {
    const gameInfo = document.getElementById("game-info");
    if (!gameInfo) return;

    gameInfo.innerHTML = `
            <div class="game-info-header">
                <div class="game-title-section">
                    <h1>${game.title}</h1>
                    <span class="game-platform-badge ${game.platform.toLowerCase()}">${
      game.platform
    }</span>
                </div>
                <div class="game-rating-section">
                    <div class="game-rating-big">${game.rating}</div>
                    <div class="game-rating-stars">${this.generateStars(
                      game.rating
                    )}</div>
                    <div class="game-rating-count">${this.formatNumber(
                      game.ratingCount
                    )} reviews</div>
                </div>
            </div>
            <p class="game-description">${game.description}</p>
            <div class="game-features">
                ${game.features
                  .map(
                    (feature) => `
                    <div class="game-feature">
                        <div class="game-feature-icon">🎮</div>
                        <h4>${feature}</h4>
                        <p>Experience ${feature.toLowerCase()} gameplay</p>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  // Render purchase section
  renderPurchaseSection(game) {
    const gamePurchase = document.getElementById("game-purchase");
    if (!gamePurchase) return;

    gamePurchase.innerHTML = `
            <div class="game-purchase-image-container">
                <img src="${game.image}" alt="${
      game.title
    }" class="game-purchase-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="game-purchase-placeholder">${game.title}</div>
            </div>
            <div class="game-purchase-price">
                ${
                  game.originalPrice && game.originalPrice > game.price
                    ? `<div class="game-price-original">$${game.originalPrice.toFixed(
                        2
                      )}</div>`
                    : ""
                }
                <div class="game-price-current">$${game.price.toFixed(2)}</div>
            </div>
            <button class="game-purchase-btn" data-game-id="${game.id}">
                Add to Cart
            </button>
            <div class="game-purchase-info">
                <h4>Game Details</h4>
                <p><strong>Genre:</strong> ${game.genre}</p>
                <p><strong>Developer:</strong> ${game.developer}</p>
                <p><strong>Publisher:</strong> ${game.publisher}</p>
                <p><strong>Release Date:</strong> ${this.formatDate(
                  game.releaseDate
                )}</p>
                <h4>System Requirements</h4>
                <ul>
                    <li><strong>OS:</strong> ${
                      game.systemRequirements.minimum.os
                    }</li>
                    <li><strong>Processor:</strong> ${
                      game.systemRequirements.minimum.processor
                    }</li>
                    <li><strong>Memory:</strong> ${
                      game.systemRequirements.minimum.memory
                    }</li>
                    <li><strong>Graphics:</strong> ${
                      game.systemRequirements.minimum.graphics
                    }</li>
                    <li><strong>Storage:</strong> ${
                      game.systemRequirements.minimum.storage
                    }</li>
                </ul>
            </div>
        `;
  }

  // Render related games section
  renderRelatedGames() {
    const relatedGamesContainer = document.getElementById(
      "related-games-container"
    );
    if (!relatedGamesContainer) return;

    // Get 3 random games excluding current game
    const otherGames = this.games.filter(
      (game) => game.id !== this.currentGame.id
    );
    const randomGames = this.shuffleArray(otherGames).slice(0, 3);

    if (randomGames.length === 0) {
      relatedGamesContainer.style.display = "none";
      return;
    }

    relatedGamesContainer.innerHTML = `
            <h2>You May Also Like</h2>
            <div class="related-grid" id="related-games">
                ${randomGames
                  .map(
                    (game) => `
                    <div class="related-game-card">
                        <a href="game-details.html?id=${
                          game.id
                        }" class="related-game-link">
                            <div class="related-game-image">
                                <img src="${game.image}" alt="${
                      game.title
                    }" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                <div class="related-game-placeholder">${
                                  game.title
                                }</div>
                            </div>
                            <div class="related-game-content">
                                <h3 class="related-game-title">${
                                  game.title
                                }</h3>
                                <div class="related-game-price">
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
                            </div>
                        </a>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;
  }

  // Setup event listeners
  setupEventListeners() {
    // Handle add to cart button clicks
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("game-purchase-btn")) {
        e.preventDefault();
        if (this.currentGame && window.cartManager) {
          window.cartManager.addToCart(this.currentGame);
        }
      }
    });

    // Handle related game button clicks
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("related-game-btn")) {
        e.preventDefault();
        const gameId = e.target.dataset.gameId;
        window.location.href = `game-details.html?id=${gameId}`;
      }
    });

    // Handle screenshot clicks for lightbox (placeholder)
    document.addEventListener("click", (e) => {
      if (e.target.closest(".screenshot-item")) {
        // Could implement lightbox here
        console.log("Screenshot clicked - lightbox could be implemented");
      }
    });
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

  // Format date
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Shuffle array
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Show error message
  showError(message) {
    const main = document.querySelector("main");
    if (main) {
      main.innerHTML = `
                <div class="container">
                    <div class="error-page">
                        <h1>Game Not Found</h1>
                        <p>${message}</p>
                        <a href="catalog.html" class="btn">Back to Catalog</a>
                    </div>
                </div>
            `;
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

// Initialize game details page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  new GameDetailsPage();
});
