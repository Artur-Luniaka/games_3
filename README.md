# SkillLootPlayground - Xbox & PC Games E-commerce Website

A modern, responsive e-commerce website for selling Xbox and PC video games, specifically designed for the Australian market.

## 🎮 Features

### Core Functionality

- **Homepage** with hero section, featured games, and multiple thematic sections
- **Game Catalog** with 3-column grid layout displaying up to 9 games
- **Game Details** page with comprehensive information and related games
- **Shopping Cart** with quantity controls and total calculation
- **Checkout** process with form validation and order summary
- **Responsive Design** with mobile-first approach (360px, 768px, 1280px breakpoints)

### Technical Features

- **Pure HTML, CSS, JavaScript** - No frameworks or libraries
- **Dynamic Content** - Header and footer inserted via JavaScript
- **Local Storage** - Cart data persists across sessions
- **JSON Data** - Game information stored in structured JSON files
- **Form Validation** - Email validation and required field checking
- **Popup Notifications** - User feedback for cart operations

### Design Features

- **Modern UI** - Clean, light design with soft color palette
- **Hover Animations** - Smooth transitions and interactive elements
- **Mobile Responsive** - Optimized for all screen sizes
- **Accessibility** - Semantic HTML and keyboard navigation

## 📁 Project Structure

```
games_3/
├── index.html              # Homepage
├── catalog.html            # Game catalog page
├── game-details.html       # Individual game details
├── cart.html              # Shopping cart page
├── checkout.html          # Checkout page
├── privacy-policy.html    # Legal pages
├── terms-of-service.html
├── return-refund-policy.html
├── shipping-delivery.html
├── css/
│   ├── style.css          # Global styles and responsive design
│   ├── home.css           # Homepage specific styles
│   ├── catalog.css        # Catalog page styles
│   ├── game-details.css   # Game details page styles
│   ├── cart.css           # Cart page styles
│   ├── checkout.css       # Checkout page styles
│   └── legal.css          # Legal pages styles
├── js/
│   ├── header.js          # Dynamic header insertion
│   ├── footer.js          # Dynamic footer insertion
│   ├── cart.js            # Cart management and localStorage
│   ├── home.js            # Homepage functionality
│   ├── catalog.js         # Catalog page functionality
│   ├── game-details.js    # Game details functionality
│   ├── cart-page.js       # Cart page rendering
│   └── checkout.js        # Checkout form handling
├── data/
│   └── games.json         # Game data with metadata, images, ratings
└── images/                # Game images and assets
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Running the Website

#### Option 1: Direct File Opening

1. Simply open `index.html` in your web browser
2. Navigate through the website using the links

#### Option 2: Local Web Server (Recommended)

1. **Using Python:**

   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

2. **Using Node.js:**

   ```bash
   npx http-server
   ```

3. **Using PHP:**

   ```bash
   php -S localhost:8000
   ```

4. Open your browser and navigate to `http://localhost:8000`

## 🎯 Target Market

- **Location**: Australia
- **Language**: English
- **Platforms**: Xbox and PC games
- **Audience**: Gamers of all ages looking for digital game purchases

## 🎨 Design Specifications

### Color Palette

- Primary: Blue tones (#3498db, #2980b9)
- Secondary: Gray tones (#95a5a6, #7f8c8d)
- Background: Light (#f8f9fa)
- Text: Dark (#2c3e50, #34495e)
- **Note**: Purple is excluded from the design as per requirements

### Responsive Breakpoints

- **Mobile**: 360px and below
- **Tablet**: 768px and below
- **Desktop**: 1280px and above

### Navigation

- **Desktop**: Horizontal navigation
- **Mobile**: Vertical stacked navigation (no burger menu)

## 📱 Pages Overview

### Homepage (`index.html`)

- Hero section with background image and "Shop Now" button
- Featured games section
- Gaming platforms section (Xbox/PC)
- Trust & security features
- Game genres showcase
- Special offers section
- Store history
- Contact information and form

### Catalog (`catalog.html`)

- 3-column grid layout
- Game cards with cover, title, price, and "Add to Cart" button
- Responsive design for all screen sizes

### Game Details (`game-details.html`)

- Comprehensive game information
- Screenshots gallery
- System requirements
- "Add to Cart" functionality
- "You may also like" section with 3 random games

### Cart (`cart.html`)

- List of added games with quantity controls
- Total cost calculation
- Checkout button
- Empty cart message with return to catalog option

### Checkout (`checkout.html`)

- Customer information form
- Payment method selection
- Order summary
- Email validation
- Form submission handling

### Legal Pages

- Privacy Policy
- Terms of Service
- Return & Refund Policy
- Shipping & Delivery

## 🔧 Technical Implementation

### JavaScript Architecture

- **Modular Design**: Each page has its own JavaScript file
- **Event-Driven**: Uses event listeners for user interactions
- **Local Storage**: Cart data persists across browser sessions
- **Dynamic Rendering**: Content loaded from JSON and rendered dynamically

### CSS Architecture

- **Mobile-First**: Responsive design starting from mobile
- **Modular Styles**: Separate CSS files for each page
- **CSS Grid & Flexbox**: Modern layout techniques
- **Smooth Animations**: Hover effects and transitions

### Data Management

- **JSON Structure**: Well-organized game data with metadata
- **Image References**: Consistent naming convention for assets
- **Extensible**: Easy to add new games and features

## 🛠️ Customization

### Adding New Games

1. Edit `data/games.json`
2. Add new game object with required fields
3. Add corresponding images to `images/` directory
4. Games will automatically appear in catalog and related sections

### Modifying Styles

1. Edit corresponding CSS file for the page
2. Global styles are in `css/style.css`
3. Responsive breakpoints are clearly defined

### Updating Content

1. HTML files contain the structure
2. JavaScript files handle dynamic content
3. JSON files contain game data

## 📧 Contact

For questions or issues:

- Email: info@skilllootplayground.com
- Phone: +61 2 3871 0066
- Address: 123 Gaming Street, Sydney, NSW 2000, Australia

## 📄 License

This project is created for educational and demonstration purposes.

---

**SkillLootPlayground** - Level Up Your Gaming Experience 🎮
