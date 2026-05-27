import { useState, useEffect } from "react";
import MainMenu from "./components/MainMenu";
import ScoreHUD from "./components/ScoreHUD";
import { useAudioEngine } from "./hooks/useAudioEngine";
import {
  ChronoSorter,
  NeuralFirewalls,
  OverrideInkLab,
  CodebreakerMatrix,
  StreamIntercept,
  TacticalMapBreach,
  InflationMarketPanic,
} from "./components/GameNodes";
import "./index.css";

function App() {
  const [activeNode, setActiveNode] = useState("menu");
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [shake, setShake] = useState(false);
  const { playSound } = useAudioEngine();

  // Pull score record history from local storage on bootstrap
  useEffect(() => {
    const cachedScore = localStorage.getItem("chronos_score");
    if (cachedScore) setScore(parseInt(cachedScore, 10));
  }, []);

  // Central point allocator engine
  const updateScore = (points, applyCombo) => {
    const added = points * (applyCombo ? combo : 1);

    setScore((prev) => {
      const nextScore = prev + added;
      localStorage.setItem("chronos_score", nextScore);

      // Compute tier jumps dynamically to fire leveling frequencies
      const currentRank = prev >= 1200 ? 2 : prev >= 300 ? 1 : 0;
      const nextRank = nextScore >= 1200 ? 2 : nextScore >= 300 ? 1 : 0;
      if (nextRank > currentRank) {
        playSound("levelup");
      }
      return nextScore;
    });
  };

  // Triggers CRT structural offset distortion animation
  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  // Factory hard override clearing mechanism
  const resetMainframeData = () => {
    if (
      window.confirm(
        "CRITICAL OVERRIDE: Clear entire browser local database records?",
      )
    ) {
      localStorage.clear();
      setScore(0);
      setCombo(1);
      setActiveNode("menu");
    }
  };

  const handleExitNode = () => {
    playSound("click");
    setActiveNode("menu");
  };

  return (
    <div id="game-board" className={shake ? "shake" : ""}>
      {/* Structural HUD Metrics Frame Panel */}
      <ScoreHUD score={score} combo={combo} onReset={resetMainframeData} />

      {/* Primary Module Router Engine Switch */}
      {activeNode === "menu" && (
        <MainMenu onSelectNode={setActiveNode} playSound={playSound} />
      )}
      {activeNode === "sort" && (
        <ChronoSorter
          playSound={playSound}
          updateScore={updateScore}
          triggerShake={triggerShake}
          onExit={handleExitNode}
        />
      )}
      {activeNode === "quiz" && (
        <NeuralFirewalls
          playSound={playSound}
          updateScore={updateScore}
          setCombo={setCombo}
          combo={combo}
          triggerShake={triggerShake}
          onExit={handleExitNode}
        />
      )}
      {activeNode === "writing" && (
        <OverrideInkLab
          playSound={playSound}
          updateScore={updateScore}
          triggerShake={triggerShake}
          onExit={handleExitNode}
        />
      )}
      {activeNode === "decrypt" && (
        <CodebreakerMatrix
          playSound={playSound}
          updateScore={updateScore}
          setCombo={setCombo}
          combo={combo}
          triggerShake={triggerShake}
          onExit={handleExitNode}
        />
      )}
      {activeNode === "hl" && (
        <StreamIntercept
          playSound={playSound}
          updateScore={updateScore}
          setCombo={setCombo}
          combo={combo}
          triggerShake={triggerShake}
          onExit={handleExitNode}
        />
      )}
      {activeNode === "map" && (
        <TacticalMapBreach
          playSound={playSound}
          updateScore={updateScore}
          triggerShake={triggerShake}
          onExit={handleExitNode}
        />
      )}
      {activeNode === "market" && (
        <InflationMarketPanic
          playSound={playSound}
          updateScore={updateScore}
          triggerShake={triggerShake}
          onExit={handleExitNode}
        />
      )}
    </div>
  );
}

export default App;
