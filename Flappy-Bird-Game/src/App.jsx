// // App.js

// import React, { useState, useEffect } from 'react';
// import Bird from './components/Bird';
// import Pipes from './components/Pipes';
// import './App.css';

// const App = () => {
// 	const [birdPosition, setBirdPosition] = useState({ x: 50, y: 200 });
// 	const [pipes, setPipes] = useState([]);
// 	const [gameOver, setGameOver] = useState(false);
// 	const [score, setScore] = useState(0);
// 	const [gameStarted, setGameStarted] = useState(false);

// 	const jump = () => {
// 		if (!gameOver && gameStarted) {
// 			setBirdPosition((prev) => ({ ...prev, y: prev.y - 60 }));
// 		} else if (!gameOver && !gameStarted) {
// 			// Start the game on the first jump
// 			setGameStarted(true);
// 		} else {
// 			// Restart the game
// 			setBirdPosition({ x: 50, y: 200 });
// 			setPipes([]);
// 			setGameOver(false);
// 			setGameStarted(true);
// 		}
// 	};

// 	const checkCollision = () => {
// 		const birdTop = birdPosition.y;
// 		const birdBottom = birdPosition.y + 50;
// 		const birdLeft = birdPosition.x;
// 		const birdRight = birdPosition.x + 50;

// 		pipes.forEach((pipe) => {
// 			const pipeTop = pipe.y;
// 			const pipeBottom = pipe.y + 600;
// 			const pipeLeft = pipe.x;
// 			const pipeRight = pipe.x + 100;

// 			const isColliding =
// 				birdRight > pipeLeft &&
// 				birdLeft < pipeRight &&
// 				birdBottom > pipeTop &&
// 				birdTop < pipeBottom;

// 			if (isColliding) {
// 				if (birdLeft > pipeLeft && birdRight < pipeRight && birdBottom < pipeBottom) {
// 					// Bird has crashed through the pipe, increase score
// 					setScore((prevScore) => prevScore + 1);
// 				} else {
// 					// Bird has hit the pipe, end the game
// 					setGameOver(true);
// 					setGameStarted(false);
// 				}
// 			}
// 		});

// 		// Check if bird is out of the screen vertically
// 		if (birdBottom > 800 || birdTop < -170) {
// 			// Bird is out of bounds, end the game
// 			setGameOver(true);
// 			setGameStarted(false);
// 		}
// 	};

// 	useEffect(() => {
// 		checkCollision();
// 	}, [birdPosition, pipes, gameOver]);

// 	useEffect(() => {
// 		const gravity = setInterval(() => {
// 			setBirdPosition((prev) => ({ ...prev, y: prev.y + 5 }));
// 			checkCollision();
// 		}, 30);

// 		const pipeGenerator = setInterval(() => {
// 			if (!gameOver && gameStarted) {
// 				setPipes((prev) => [
// 					...prev,
// 					{ x: 400, y: Math.floor(Math.random() * 300) },
// 				]);
// 			}
// 		}, 2000);

// 		const pipeMove = setInterval(() => {
// 			if (!gameOver && gameStarted) {
// 				setPipes((prev) =>
// 					prev.map((pipe) => ({ ...pipe, x: pipe.x - 5 }))
// 				);
// 			}
// 		}, 30);

// 		return () => {
// 			clearInterval(gravity);
// 			clearInterval(pipeGenerator);
// 			clearInterval(pipeMove);
// 		};
// 	}, [gameOver, gameStarted]);

// 	return (
// 		<div className={`App ${gameOver ? 'game-over' : ''}`} onClick={jump}>
// 			<Bird birdPosition={birdPosition} />
// 			{pipes.map((pipe, index) => (
// 				<Pipes key={index} pipePosition={pipe} />
// 			))}
// 			{gameOver && (
// 				<center>
// 					<div className="game-over-message">
// 						Game Over!
// 						<br />
// 						<p style={{ backgroundColor: 'blue', padding: "2px 6px", borderRadius: '5px' }}>Click anywhere to Restart</p>
// 					</div>
// 				</center>
// 			)}
// 		</div>
// 	);
// };

// export default App;
import { useState, useEffect, useRef, useCallback } from "react";
import Clouds from "./Components/Clouds";
import "./App.css";
import Bird from "./Components/Bird";
import Pipe from "./Components/Pipe";
import flapSound from "./assets/sounds/flap.mp3";
import scoreSound from "./assets/sounds/score.mp3";
import hitSound from "./assets/sounds/hit.mp3";

const BOARD_WIDTH = 750;
const BOARD_HEIGHT = 750;

const BIRD_X = 100;
const BIRD_WIDTH = 60;
const BIRD_HEIGHT = 45;

const GRAVITY = 1200;
const JUMP_STRENGTH = -380;

const PIPE_WIDTH = 90;
const PIPE_SPEED = 220;
const GAP_HEIGHT = 190;

function createPipe(x) {
  const minGapTop = 100;
  const maxGapTop = BOARD_HEIGHT - GAP_HEIGHT - 100;

  const gapTop =
    Math.floor(Math.random() * (maxGapTop - minGapTop + 1)) + minGapTop;

  return {
    id: crypto.randomUUID(),
    x,
    gapTop,
    passed: false,
  };
}

function createInitialPipes() {
  return [createPipe(BOARD_WIDTH)];
}

function App() {
  const [birdPosition, setBirdPosition] = useState(200);
  const [pipes, setPipes] = useState(createInitialPipes);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");

  const birdPositionRef = useRef(200);
  const velocityRef = useRef(0);
  const pipesRef = useRef(pipes);
  const lastTimeRef = useRef(null);
  const gameStatusRef = useRef("playing");
  const flapAudioRef = useRef(null);
  const scoreAudioRef = useRef(null);
  const hitAudioRef = useRef(null);

  useEffect(() => {
    flapAudioRef.current = new Audio(flapSound);
    scoreAudioRef.current = new Audio(scoreSound);
    hitAudioRef.current = new Audio(hitSound);

    flapAudioRef.current.preload = "auto";
    scoreAudioRef.current.preload = "auto";
    hitAudioRef.current.preload = "auto";
  }, []);

  const jump = useCallback(() => {
    if (gameStatusRef.current !== "playing") return;

    velocityRef.current = JUMP_STRENGTH;

    const audio = flapAudioRef.current;

    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, []);

  const endGame = useCallback(() => {
    if (gameStatusRef.current !== "playing") return;

    gameStatusRef.current = "over";
    setGameStatus("over");

    const audio = hitAudioRef.current;

    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  }, []);

  const restartGame = useCallback(() => {
    const initialPipes = createInitialPipes();

    birdPositionRef.current = 200;
    velocityRef.current = 0;
    pipesRef.current = initialPipes;
    lastTimeRef.current = null;
    gameStatusRef.current = "playing";

    setBirdPosition(200);
    setPipes(initialPipes);
    setScore(0);
    setGameStatus("playing");
  }, []);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    let animationId;

    const updateGame = (timestamp) => {
      if (gameStatusRef.current !== "playing") return;

      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = Math.min(
        (timestamp - lastTimeRef.current) / 1000,
        0.032,
      );

      lastTimeRef.current = timestamp;

      // Update bird physics
      velocityRef.current += GRAVITY * deltaTime;
      birdPositionRef.current += velocityRef.current * deltaTime;

      const birdTop = birdPositionRef.current;
      const birdBottom = birdTop + BIRD_HEIGHT;
      const birdLeft = BIRD_X;
      const birdRight = birdLeft + BIRD_WIDTH;

      // Ceiling and ground collision
      if (birdTop <= 0 || birdBottom >= BOARD_HEIGHT) {
        endGame();
        return;
      }

      // Move pipes
      let nextPipes = pipesRef.current.map((pipe) => ({
        ...pipe,
        x: pipe.x - PIPE_SPEED * deltaTime,
      }));

      // Pipe collision and scoring
      for (let i = 0; i < nextPipes.length; i++) {
        const pipe = nextPipes[i];

        const overlapsHorizontally =
          birdRight > pipe.x && birdLeft < pipe.x + PIPE_WIDTH;

        const gapBottom = pipe.gapTop + GAP_HEIGHT;

        const hitsPipe =
          overlapsHorizontally &&
          (birdTop < pipe.gapTop || birdBottom > gapBottom);

        if (hitsPipe) {
          endGame();
          return;
        }

        if (!pipe.passed && pipe.x + PIPE_WIDTH < birdLeft) {
          pipe.passed = true;

          setScore((previousScore) => previousScore + 1);

          const audio = scoreAudioRef.current;

          if (audio) {
            audio.currentTime = 0;
            audio.play().catch(() => {});
          }
        }
      }

      // Remove pipes that leave the board
      nextPipes = nextPipes.filter((pipe) => pipe.x + PIPE_WIDTH > 0);

      // Add the next pipe
      const lastPipe = nextPipes[nextPipes.length - 1];

      if (!lastPipe || lastPipe.x < BOARD_WIDTH - 350) {
        nextPipes.push(createPipe(BOARD_WIDTH));
      }

      pipesRef.current = nextPipes;

      setBirdPosition(birdPositionRef.current);
      setPipes(nextPipes);

      animationId = requestAnimationFrame(updateGame);
    };

    animationId = requestAnimationFrame(updateGame);

    return () => {
      cancelAnimationFrame(animationId);
      lastTimeRef.current = null;
    };
  }, [gameStatus, endGame]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();

        if (event.repeat) return;

        if (gameStatusRef.current === "over") {
          restartGame();
        } else {
          jump();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [jump, restartGame]);

  return (
    <div
      className="game-container"
      onPointerDown={(event) => {
        if (event.target.closest(".game-over-panel")) return;

        if (gameStatusRef.current === "over") {
          restartGame();
        } else {
          jump();
        }
      }}
    >
      <h1>Flappy Bird</h1>

      <div className="score">Score: {score}</div>

      {/* Animated background clouds */}
      <Clouds />

      {/* Bird */}
      <Bird birdPosition={birdPosition} />

      {/* Pipes */}
      {pipes.map((pipe) => (
        <Pipe
          key={pipe.id}
          x={pipe.x}
          gapTop={pipe.gapTop}
          gapBottom={pipe.gapTop + GAP_HEIGHT}
          boardHeight={BOARD_HEIGHT}
        />
      ))}

      {/* Game Over Screen */}
      {gameStatus === "over" && (
        <div className="game-over-panel">
          <h2>Game Over!</h2>
          <p>Your Score: {score}</p>

          <button
            onPointerDown={(event) => event.stopPropagation()}
            onClick={restartGame}
          >
            Play Again
          </button>

          <p className="restart-hint">Press Space to restart</p>
        </div>
      )}
    </div>
  );
}

export default App;
