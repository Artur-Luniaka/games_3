// Header Component
function createHeader() {
  const header = document.createElement("header");
  header.innerHTML = `
        <div class="container">
            <div class="header-content">
                <a href="./" class="logo">SkillLoot<span>Playground</span></a>
                <nav>
                    <ul>
                        <li><a href="./">Home</a></li>
                        <li><a href="catalog.html">Games</a></li>
                        <li><a href="./#featured-games">Featured Games</a></li>
                        <li><a href="./#store-history">Our Story</a></li>
                        <li><a href="./#contact-section">Get in Touch</a></li>
                        <li><a href="cart.html" class="cart-icon">
                            🛒 <span class="cart-count" id="cart-count">0</span>
                        </a></li>
                    </ul>
                </nav>
            </div>
        </div>
    `;
  return header;
}

// Insert header into placeholder
function insertHeader() {
  const headerPlaceholder = document.getElementById("header-placeholder");
  if (headerPlaceholder) {
    const header = createHeader();
    headerPlaceholder.parentNode.insertBefore(header, headerPlaceholder);
    headerPlaceholder.remove();
  }
}

// Update cart count
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

// Initialize header when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  insertHeader();
  updateCartCount();
});
