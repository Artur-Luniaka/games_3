// Footer Component
function createFooter() {
  const footer = document.createElement("footer");
  footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="catalog.html">Games</a></li>
                        <li><a href="cart.html">Cart</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Support</h3>
                    <ul>
                        <li><a href="shipping-delivery.html">Shipping & Delivery</a></li>
                        <li><a href="return-refund-policy.html">Returns & Refunds</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="terms-of-service.html">Terms of Service</a></li>
                        <li><a href="cookies-policy.html">Cookies Policy</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 GameZone Australia. All rights reserved.</p>
            </div>
        </div>
    `;
  return footer;
}

// Insert footer into placeholder
function insertFooter() {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    const footer = createFooter();
    footerPlaceholder.parentNode.insertBefore(footer, footerPlaceholder);
    footerPlaceholder.remove();
  }
}

// Initialize footer when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  insertFooter();
});
