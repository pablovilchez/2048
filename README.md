# 2048 Game

A modern implementation of the classic 2048 puzzle game built with vanilla JavaScript, HTML5, and CSS3. Join the numbers and try to reach the 2048 tile!

## 🎮 How to Play

1. Use your **arrow keys** to move all tiles in the desired direction
2. When two tiles with the same number touch, they **merge into one** with their sum
3. After each move, a new tile appears (value of 2 or 4)
4. The game continues until you either:
   - Reach the 2048 tile (Win! 🎉)
   - Fill the board with no possible moves (Game Over 😢)

## ✨ Features

- **Smooth Animations**

  - New tile pop-in effects
  - Game over modal animations

- **Clean UI/UX**

  - Responsive design
  - Score tracking
  - Game instructions

- **Game Elements**
  - Score tracking
  - New game option
  - Win/lose detection
  - Merge animations
  - Attractive final messages

## 🛠 Technical Implementation

### Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript

### Key Components

- Grid-based game board (4x4)
- Event handling for keyboard input
- Matrix manipulation for tile movement
- CSS Grid and Flexbox for layout
- CSS animations and transitions
- DOM manipulation for UI updates

### CSS Features

- CSS custom properties for theming
- Responsive design principles
- Transform and transition animations
- Flexbox and Grid layouts

### JavaScript Features

- Array manipulation
- Event handling
- DOM manipulation
- Animation management
- Game state tracking
- Score calculation

## 🌐 Deployment

The game can be deployed in several ways:

### 1. GitHub Pages

The simplest way to deploy the game:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select your main branch as source
4. Your game will be available at `https://<username>.github.io/2048/`

### 2. Static Hosting Services

Deploy to various static hosting platforms:

#### Netlify

1. Sign up for a Netlify account
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
4. Deploy! Your site will be live at `https://your-site-name.netlify.app`

#### Vercel

1. Sign up for a Vercel account
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: `/`
4. Deploy! Your site will be available at `https://your-project.vercel.app`

### 3. Traditional Web Hosting

Upload files to any web hosting service:

1. Compress your project files:
   ```bash
   zip -r 2048-game.zip index.html styles.css script.js
   ```
2. Upload to your hosting service via FTP/SFTP
3. Extract files in your public_html or www directory

### 4. Local Development Server

For testing, use a simple HTTP server:

Using Python:

```bash
# Python 3.x
python -m http.server 8000
```

Using Node.js:

```bash
# Install serve globally
npm install -g serve
# Start server
serve
```

Then visit `http://localhost:8000` or `http://localhost:3000` (for serve)
