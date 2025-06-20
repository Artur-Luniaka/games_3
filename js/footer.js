// Footer Component
function createFooter() {
  const footer = document.createElement("footer");
  footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="./">Home</a></li>
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
                <p>&copy; 2025 SkillLootPlayground.com | All rights reserved</p>
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

// Create and manage Cookie Consent Bar
function manageCookieConsent() {
  const cookieBarHTML = `
    <div id="cookie-consent-bar" class="cookie-consent-bar">
        <div class="container cookie-consent-content">
            <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. <a href="cookies-policy.html">Learn more</a>.</p>
            <button id="cookie-consent-btn" class="btn">Accept</button>
        </div>
    </div>
    `;

  document.body.insertAdjacentHTML("beforeend", cookieBarHTML);

  const consentBar = document.getElementById("cookie-consent-bar");
  const consentBtn = document.getElementById("cookie-consent-btn");

  if (!consentBar || !consentBtn) return;

  const hasConsented = localStorage.getItem("skilllootCookieConsent");

  setTimeout(() => {
    if (!hasConsented) {
      consentBar.classList.add("show");
    }
  }, 500);

  consentBtn.addEventListener("click", () => {
    localStorage.setItem("skilllootCookieConsent", "true");
    consentBar.classList.remove("show");
  });
}

// Initialize footer when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  insertFooter();
  manageCookieConsent();
});
