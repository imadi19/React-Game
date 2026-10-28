# 🐦 Flappy Bird Game

A fun, interactive Flappy Bird game built using React and Vite. Navigate the bird through randomly generated pipes, beat your high score, and enjoy animated clouds and sound effects!

## 🎮 Live Demo

🚀 **[Play Flappy Bird Online](https://react-game-chi-five.vercel.app/)**

## ✨ Features

- 🐤 Bird movement with gravity-based physics
- ⬆️ Jump controls using keyboard, mouse, or touch
- 🚧 Pipes with randomly generated gaps
- 💥 Collision detection for pipes, ceiling, and ground
- 🏆 Real-time score tracking
- 🔄 Game Over screen with restart functionality
- ☁️ Animated clouds and a sky-themed background
- 🔊 Sound effects for jumping, scoring, and collisions
- 📱 Pointer and touch interaction support
- 🚀 Deployed to Vercel

## 🕹️ How to Play

1. Press **Space** or **Arrow Up** to make the bird jump.
2. Alternatively, click or tap the game area.
3. Navigate through the gaps between the pipes.
4. Avoid hitting the pipes, ceiling, or ground.
5. After Game Over, press Space or click/tap to restart, or select **Play Again**.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | UI and component-based development |
| Vite | Development server and production build |
| JavaScript | Game logic, physics, collision detection, and scoring |
| CSS | Styling, layout, and animations |
| HTML5 Audio | Sound effects |
| Git & GitHub | Version control and source code hosting |
| Vercel | Deployment and hosting |

## 💻 Run Locally

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/imadi19/React-Game.git
```

**2. Navigate to the game directory**

```bash
cd React-Game/Flappy-Bird-Game
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL shown in your terminal.

### Production Build

To generate a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```text
Flappy-Bird-Game/
├── src/
│   ├── assets/
│   │   └── sounds/
│   │       ├── flap.mp3
│   │       ├── score.mp3
│   │       └── hit.mp3
│   ├── Components/
│   │   ├── Bird.jsx
│   │   ├── Clouds.jsx
│   │   └── Pipe.jsx
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 👨‍💻 Author

**Aditya Raj**

- GitHub: [@imadi19](https://github.com/imadi19)
- Repository: [React-Game](https://github.com/imadi19/React-Game)
- Live Demo: [Flappy Bird Game](https://react-game-chi-five.vercel.app/)

---

⭐ If you enjoy the game, try the live demo and explore the source code!
