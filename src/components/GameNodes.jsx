import React, { useState, useEffect, useRef } from "react";
import {
  historyData,
  quizPool,
  writingPrompts,
  decryptPool,
  mapTargets,
} from "../data/historyData";

export function ChronoSorter({ playSound, updateScore, triggerShake, onExit }) {
  const [cards, setCards] = useState([]);
  const [placements, setPlacements] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [feedback, setFeedback] = useState({ text: "", color: "" });

  useEffect(() => {
    setCards([...historyData].sort(() => Math.random() - 0.5));
  }, []);

  const handleSlotClick = (slotIdx) => {
    playSound("click");
    if (!selectedCard) return;

    const newPlacements = { ...placements };
    for (let key in newPlacements) {
      if (newPlacements[key] === selectedCard.id) delete newPlacements[key];
    }
    newPlacements[slotIdx] = selectedCard.id;
    setPlacements(newPlacements);
    setSelectedCard(null);
  };

  const verifyTimeline = () => {
    let correctCount = 0;
    historyData.forEach((item, idx) => {
      if (placements[idx] === item.id) correctCount++;
    });

    if (correctCount === historyData.length) {
      playSound("success");
      setFeedback({
        text: "✨ CHRONOLOGY VALIATED: The historical sequence is perfectly aligned. (+200 Points)",
        color: "#2c1a04",
      });
      updateScore(200, false);
    } else {
      playSound("fail");
      triggerShake();
      setFeedback({
        text: `⚠️ ANachronism DETECTED: ${historyData.length - correctCount} records are out of order. Consult historical annals!`,
        color: "#cc3300",
      });
    }
  };

  return (
    <div className="screen active">
      <h2>FOLIO I: CHRONOLOGICAL TIMELINE CALIBRATION</h2>
      <p style={{ textAlign: "center", color: "#555", fontStyle: "italic" }}>
        Arrange the historical elements into the ledger slots sequentially (1701
        to 1783).
      </p>
      <div className="timeline-slots">
        {historyData.map((_, idx) => {
          const placedId = placements[idx];
          const foundCard = historyData.find((h) => h.id === placedId);
          return (
            <div
              key={idx}
              className="slot"
              onClick={() => handleSlotClick(idx)}
              style={{ borderColor: foundCard ? "#8b4513" : "#d2b48c" }}
            >
              <div className="slot-title">LEDGER SLOT 0{idx + 1}</div>
              <div
                className="slot-content"
                style={{ color: foundCard ? "#2c1a04" : "#888" }}
              >
                {foundCard ? foundCard.title : "[EMPTY RECORD]"}
              </div>
            </div>
          );
        })}
      </div>
      <hr style={{ borderColor: "#d2b48c", margin: "20px 0" }} />
      <div className="timeline-cards">
        {cards.map((card) => {
          if (Object.values(placements).includes(card.id)) return null;
          return (
            <div
              key={card.id}
              className={`game-card ${selectedCard?.id === card.id ? "selected" : ""}`}
              onClick={() => {
                playSound("click");
                setSelectedCard(card);
              }}
            >
              {card.title}
            </div>
          );
        })}
      </div>
      <div className="feedback" style={{ color: feedback.color }}>
        {feedback.text}
      </div>
      <div style={{ textAlign: "center" }}>
        <button className="btn btn-inline" onClick={verifyTimeline}>
          Authenticate Ledger
        </button>
        <button
          className="btn btn-inline"
          style={{ borderColor: "#8b4513", color: "#8b4513" }}
          onClick={onExit}
        >
          Return to Library
        </button>
      </div>
    </div>
  );
}

export function NeuralFirewalls({
  playSound,
  updateScore,
  setCombo,
  combo,
  triggerShake,
  onExit,
}) {
  const [idx, setIdx] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [feedback, setFeedback] = useState({ text: "", color: "" });
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(100);
  const timerRef = useRef(null);

  const currentQuestion = quizPool[idx];

  useEffect(() => {
    if (idx < quizPool.length) {
      setShuffledOptions(
        [...quizPool[idx].options].sort(() => Math.random() - 0.5),
      );
      setAnswered(false);
      setFeedback({ text: "", color: "" });
      setTimeLeft(100);

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0) {
            clearInterval(timerRef.current);
            handleFailure("HOURGLASS EXPIRED! Examination window closed.");
            return 0;
          }
          return prev - 1.6;
        });
      }, 100);
    }
    return () => clearInterval(timerRef.current);
  }, [idx]);

  const handleFailure = (msg) => {
    playSound("fail");
    triggerShake();
    setCombo(1);
    setAnswered(true);
    setFeedback({ text: msg, color: "#cc3300" });
  };

  const handleChoice = (opt) => {
    if (answered) return;
    clearInterval(timerRef.current);
    if (opt === currentQuestion.a) {
      playSound("success");
      setFeedback({
        text: `⚖️ TESTIMONY VERIFIED! Historical consensus met. (+50 pts x${combo})`,
        color: "#2c1a04",
      });
      updateScore(50, true);
      setAnswered(true);
    } else {
      handleFailure(
        `CONTRASTING EVIDENCE. Accepted Record: "${currentQuestion.a}"`,
      );
    }
  };

  return (
    <div className="screen active">
      <h2>FOLIO II: IMPERIAL EXAMINATION</h2>
      <div className="timer-container" style={{ display: "block" }}>
        <div className="timer-bar" style={{ width: `${timeLeft}%` }}></div>
      </div>
      {idx < quizPool.length ? (
        <div id="question-box">
          <p
            className="question-text"
            style={{
              fontSize: "18px",
              textAlign: "center",
              color: "#2c1a04",
              fontWeight: "bold",
            }}
          >
            [TESTIMONY EXAM 0{idx + 1}]: {currentQuestion.q}
          </p>
          <div className="choices-grid">
            {shuffledOptions.map((opt, i) => (
              <button
                key={i}
                className="choice-btn"
                disabled={answered}
                onClick={() => handleChoice(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="feedback" style={{ color: "#2c1a04" }}>
          🏆 EXAMINATION COMPLETE: Imperial records fully authenticated.
        </div>
      )}
      <div className="feedback" style={{ color: feedback.color }}>
        {feedback.text}
      </div>
      <div style={{ textAlign: "center" }}>
        {answered && idx < quizPool.length && (
          <button className="btn btn-inline" onClick={() => setIdx(idx + 1)}>
            Next Examination Paper &rarr;
          </button>
        )}
        <button
          className="btn btn-inline"
          style={{ borderColor: "#8b4513", color: "#8b4513" }}
          onClick={onExit}
        >
          Return to Library
        </button>
      </div>
    </div>
  );
}

export function OverrideInkLab({
  playSound,
  updateScore,
  triggerShake,
  onExit,
}) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", color: "" });

  const currentPrompt = writingPrompts[idx];

  const verifyText = () => {
    if (input.trim().length < 12) {
      playSound("fail");
      setFeedback({
        text: "❌ INSUFFICIENT DETAIL. Document lacks historical depth.",
        color: "#cc3300",
      });
      return;
    }
    let matches = 0;
    currentPrompt.keywords.forEach((word) => {
      if (input.toLowerCase().includes(word)) matches++;
    });

    if (matches >= currentPrompt.minKeywords) {
      playSound("success");
      setFeedback({
        text: `⚓ SCROLL SEALED. Core events successfully transcribed! (+100 Score)`,
        color: "#2c1a04",
      });
      updateScore(100, false);
      setAnswered(true);
    } else {
      playSound("fail");
      triggerShake();
      setFeedback({
        text: `🔍 CRITICAL OMISSIONS: Discrepancy in verification signatures. Note: ${currentPrompt.hint}`,
        color: "#b8860b",
      });
    }
  };

  return (
    <div className="screen active">
      <h2>FOLIO III: DOCUMENT TRANSCRIPTION</h2>
      {idx < writingPrompts.length ? (
        <div className="writing-container">
          <h3
            style={{
              color: "#8b4513",
              textAlign: "left",
              fontFamily: "Georgia, serif",
            }}
          >
            PROMPT LOG 0{idx + 1}: {currentPrompt.title}
          </h3>
          <p style={{ color: "#2c1a04", fontStyle: "italic" }}>
            {currentPrompt.desc}
          </p>
          <textarea
            disabled={answered}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Dip your quill and transcribe the account here..."
          />
        </div>
      ) : (
        <div className="feedback" style={{ color: "#2c1a04" }}>
          COMPREHENSIVE ANNAL EDITIONS FULLY COMPILED.
        </div>
      )}
      <div className="feedback" style={{ color: feedback.color }}>
        {feedback.text}
      </div>
      <div style={{ textAlign: "center" }}>
        {!answered && idx < writingPrompts.length && (
          <button className="btn btn-inline" onClick={verifyText}>
            Seal and Verify Record
          </button>
        )}
        {answered && idx < writingPrompts.length && (
          <button
            className="btn btn-inline"
            onClick={() => {
              setIdx(idx + 1);
              setInput("");
              setAnswered(false);
              setFeedback({ text: "", color: "" });
            }}
          >
            Examine Next Loose Fragment &rarr;
          </button>
        )}
        <button
          className="btn btn-inline"
          style={{ borderColor: "#8b4513", color: "#8b4513" }}
          onClick={onExit}
        >
          Return to Library
        </button>
      </div>
    </div>
  );
}

export function CodebreakerMatrix({
  playSound,
  updateScore,
  setCombo,
  combo,
  triggerShake,
  onExit,
}) {
  const [idx, setIdx] = useState(0);
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", color: "" });

  useEffect(() => {
    if (idx < decryptPool.length) {
      const original = decryptPool[idx].word;
      let wordScrambled = original
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
      while (wordScrambled === original) {
        wordScrambled = original
          .split("")
          .sort(() => Math.random() - 0.5)
          .join("");
      }
      setScrambled(wordScrambled);
      setGuess("");
      setAnswered(false);
      setFeedback({ text: "", color: "" });
    }
  }, [idx]);

  const verifyDecryption = () => {
    if (guess.toUpperCase().trim() === decryptPool[idx].word) {
      playSound("success");
      setFeedback({
        text: `✨ FRAGMENT DECIPHERED! Text accurately restored to ledger (+60 pts x${combo})`,
        color: "#2c1a04",
      });
      updateScore(60, true);
      setAnswered(true);
    } else {
      playSound("fail");
      triggerShake();
      setCombo(1);
      setFeedback({
        text: "❌ PALAEOGRAPHIC DEVIATION. Unscrambled text does not align with archaic text structure.",
        color: "#cc3300",
      });
    }
  };

  return (
    <div className="screen active">
      <h2>FOLIO IV: PARCHMENT FRAGMENT RECONSTRUCTION</h2>
      {idx < decryptPool.length ? (
        <>
          <div style={{ textAlign: "center", margin: "30px 0" }}>
            <div
              style={{ fontSize: "14px", color: "#666", fontStyle: "italic" }}
            >
              DAMAGED WATERMARK PHRASE:
            </div>
            <div
              style={{
                fontSize: "36px",
                color: "#8b4513",
                fontFamily: "Georgia, serif",
                fontWeight: "bold",
                margin: "15px 0",
                letterSpacing: "4px",
              }}
            >
              {scrambled}
            </div>
            <div style={{ color: "#556b2f", fontWeight: "bold" }}>
              CONTEXTUAL GLOSS: {decryptPool[idx].hint}
            </div>
          </div>
          <input
            type="text"
            value={guess}
            disabled={answered}
            onChange={(e) => setGuess(e.target.value)}
            className="decrypt-input"
            placeholder="Transcribe missing word..."
          />
        </>
      ) : (
        <div className="feedback" style={{ color: "#2c1a04" }}>
          🛡️ SUCCESS: All damaged manuscript collections have been fully
          restored.
        </div>
      )}
      <div className="feedback" style={{ color: feedback.color }}>
        {feedback.text}
      </div>
      <div style={{ textAlign: "center" }}>
        {!answered && idx < decryptPool.length && (
          <button className="btn btn-inline" onClick={verifyDecryption}>
            Log Transcription
          </button>
        )}
        {answered && idx < decryptPool.length && (
          <button className="btn btn-inline" onClick={() => setIdx(idx + 1)}>
            Analyze Next Parchment &rarr;
          </button>
        )}
        <button
          className="btn btn-inline"
          style={{ borderColor: "#8b4513", color: "#8b4513" }}
          onClick={onExit}
        >
          Return to Library
        </button>
      </div>
    </div>
  );
}

export function StreamIntercept({
  playSound,
  updateScore,
  setCombo,
  combo,
  triggerShake,
  onExit,
}) {
  const [pool, setPool] = useState([]);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", color: "" });

  useEffect(() => {
    setPool([...historyData].sort(() => Math.random() - 0.5));
  }, []);

  const handleChoice = (choice) => {
    if (answered) return;
    const anchor = pool[idx];
    const target = pool[idx + 1];
    let isCorrect =
      (choice === "earlier" && target.numericYear <= anchor.numericYear) ||
      (choice === "later" && target.numericYear >= anchor.numericYear);

    if (isCorrect) {
      playSound("success");
      setFeedback({
        text: `🚀 HISTORICALLY SOUND! ${target.title} occurred in ${target.numericYear}. (+75 pts x${combo})`,
        color: "#2c1a04",
      });
      updateScore(75, true);
    } else {
      playSound("fail");
      triggerShake();
      setCombo(1);
      setFeedback({
        text: `❌ ANACRONISM DESYNC. ${target.title} happened in ${target.numericYear}.`,
        color: "#cc3300",
      });
    }
    setAnswered(true);
  };

  if (pool.length === 0) return null;

  const finished = idx >= pool.length - 1;

  return (
    <div className="screen active">
      <h2>FOLIO V: HISTORICAL SEQUENCE ANALYSIS</h2>
      {!finished ? (
        <div className="hl-card-box">
          <div className="hl-card" style={{ borderColor: "#8b4513" }}>
            <div
              style={{ fontSize: "12px", color: "#666", fontStyle: "italic" }}
            >
              ESTABLISHED ANCHOR RECORD
            </div>
            <h4 style={{ color: "#2c1a04", fontFamily: "Georgia, serif" }}>
              {pool[idx].title}
            </h4>
            <div style={{ color: "#8b4513", fontWeight: "bold" }}>
              Year: {pool[idx].numericYear}
            </div>
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#8b4513",
              fontFamily: "Georgia, serif",
            }}
          >
            VS
          </div>
          <div className="hl-card" style={{ borderColor: "#b8860b" }}>
            <div
              style={{ fontSize: "12px", color: "#666", fontStyle: "italic" }}
            >
              COMPARATIVE PHENOMENON
            </div>
            <h4 style={{ color: "#2c1a04", fontFamily: "Georgia, serif" }}>
              {pool[idx + 1].title}
            </h4>
            <div style={{ color: "#777", fontStyle: "italic" }}>
              [Date Obscured in Ledger]
            </div>
          </div>
        </div>
      ) : (
        <div className="feedback" style={{ color: "#2c1a04" }}>
          🎯 CHRONICLER MASTERY ACHIEVED: Comparative sequencing matrix
          resolved.
        </div>
      )}
      <div className="feedback" style={{ color: feedback.color }}>
        {feedback.text}
      </div>
      <div style={{ textAlign: "center" }}>
        {!answered && !finished && (
          <div style={{ textAlign: "center" }}>
            <button
              className="btn btn-inline"
              style={{ borderColor: "#8b4513" }}
              onClick={() => handleChoice("earlier")}
            >
              ◀ ANTERIOR (Occurred Before)
            </button>
            <button
              className="btn btn-inline"
              style={{ borderColor: "#b8860b" }}
              onClick={() => handleChoice("later")}
            >
              POSTERIOR (Occurred After) ▶
            </button>
          </div>
        )}
        {answered && !finished && (
          <button
            className="btn btn-inline"
            onClick={() => {
              setIdx(idx + 1);
              setAnswered(false);
              setFeedback({ text: "", color: "" });
            }}
          >
            Compare Next Sequence &rarr;
          </button>
        )}
        <button
          className="btn btn-inline"
          style={{ borderColor: "#8b4513", color: "#8b4513" }}
          onClick={onExit}
        >
          Return to Library
        </button>
      </div>
    </div>
  );
}

export function TacticalMapBreach({
  playSound,
  updateScore,
  triggerShake,
  onExit,
}) {
  const [missionIdx, setMissionIdx] = useState(0);
  const [target, setTarget] = useState({ r: 0, c: 0 });
  const [rations, setRations] = useState(4);
  const [tileStates, setTileStates] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", color: "" });

  const currentMission = mapTargets[missionIdx % mapTargets.length];

  const initializeMap = () => {
    setTarget({
      r: Math.floor(Math.random() * 4),
      c: Math.floor(Math.random() * 4),
    });
    setRations(4);
    setTileStates({});
    setGameOver(false);
    setFeedback({ text: "", color: "" });
  };

  useEffect(() => {
    initializeMap();
  }, [missionIdx]);

  const handleTileClick = (r, c) => {
    const key = `${r},${c}`;
    if (rations <= 0 || tileStates[key] || gameOver) return;
    playSound("click");

    if (r === target.r && c === target.c) {
      playSound("success");
      setTileStates({ ...tileStates, [key]: "FORTRESS" });
      setFeedback({
        text: `🎯 OUTPOST DISCOVERED! Strategic coordinates recorded in dispatch logs. (+120 Score)`,
        color: "#2c1a04",
      });
      updateScore(120, false);
      setGameOver(true);
    } else {
      const nextRations = rations - 1;
      setRations(nextRations);
      const dist = Math.abs(target.r - r) + Math.abs(target.c - c);
      const state = dist <= 1 ? "TRAILS FOUND" : "WILDERNESS";
      const updatedStates = { ...tileStates, [key]: state };

      if (nextRations <= 0) {
        playSound("fail");
        triggerShake();
        setFeedback({
          text: `❌ EXPEDITION LOST. Provisions exhausted. Garrison was camped at sector [${target.r}, ${target.c}].`,
          color: "#cc3300",
        });
        setGameOver(true);
      }
      setTileStates(updatedStates);
    }
  };

  return (
    <div className="screen active">
      <h2>FOLIO VI: CARTOGRAPHIC RECONNAISSANCE</h2>
      <p style={{ textAlign: "center", color: "#555", fontStyle: "italic" }}>
        OBJECTIVE ADVISORY: {currentMission.title} - {currentMission.desc}
      </p>
      <div
        style={{
          textAlign: "center",
          color: "#8b4513",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        EXPEDITION PROVISIONS REMAINING: {rations} UNITS
      </div>
      <div className="map-grid">
        {Array.from({ length: 4 }).map((_, r) =>
          Array.from({ length: 4 }).map((_, c) => {
            const key = `${r},${c}`;
            const state = tileStates[key];
            let bg = "#f4eae1";
            if (state === "FORTRESS") bg = "#b8860b";
            if (state === "TRAILS FOUND") bg = "#cd853f";
            if (state === "WILDERNESS") bg = "#d2b48c";

            return (
              <div
                key={key}
                className="grid-tile"
                style={{
                  backgroundColor: bg,
                  color: state === "FORTRESS" ? "#fff" : "#2c1a04",
                  opacity: gameOver && !state ? 0.4 : 1,
                  border: "1px solid #8b4513",
                }}
                onClick={() => handleTileClick(r, c)}
              >
                {state || `[${r},${c}]`}
              </div>
            );
          }),
        )}
      </div>
      <div className="feedback" style={{ color: feedback.color }}>
        {feedback.text}
      </div>
      <div style={{ textAlign: "center" }}>
        {gameOver && (
          <button
            className="btn btn-inline"
            onClick={() => setMissionIdx((prev) => prev + 1)}
          >
            Chart Next Operational Coordinates &rarr;
          </button>
        )}
        <button
          className="btn btn-inline"
          style={{ borderColor: "#8b4513", color: "#8b4513" }}
          onClick={onExit}
        >
          Return to Library
        </button>
      </div>
    </div>
  );
}

export function InflationMarketPanic({
  playSound,
  updateScore,
  triggerShake,
  onExit,
}) {
  const [multiplier, setMultiplier] = useState(1.0);
  const [isInvested, setIsInvested] = useState(false);
  const [status, setStatus] = useState(
    "BALANCE SHEET: LIQUID SPECIE RESERVES AVAILABLE",
  );
  const [feedback, setFeedback] = useState({ text: "", color: "" });
  const intervalRef = useRef(null);

  const startInvestment = () => {
    playSound("click");
    setIsInvested(true);
    setFeedback({ text: "", color: "" });
    setStatus(
      "BALANCE SHEET: CREDIT EXPOSED TO THE COLONIAL speculative MARGIN...",
    );
    const crashThreshold = 1.5 + Math.random() * 3.5;

    intervalRef.current = setInterval(() => {
      setMultiplier((prev) => {
        const next = prev + 0.08 + Math.random() * 0.05;
        if (next >= crashThreshold) {
          clearInterval(intervalRef.current);
          playSound("fail");
          triggerShake();
          setIsInvested(false);
          setStatus("BALANCE SHEET: INSOLVENCY DETECTED / SPECIE DRAIN");
          setFeedback({
            text: "⚠️ MARKET COLLAPSE: The speculative merchant bubble burst before your bills of exchange were cleared! (Assets Deflated to 0)",
            color: "#cc3300",
          });
          return 0;
        }
        return next;
      });
    }, 150);
  };

  const cashOut = () => {
    if (!isInvested) return;
    clearInterval(intervalRef.current);
    playSound("success");
    setIsInvested(false);
    const gains = Math.round(50 * multiplier);
    setStatus("BALANCE SHEET: ASSETS SECURED IN PHYSICAL SPECIE CURRENCY");
    setFeedback({
      text: `💰 VENTURE LIQUIDATED! Safely divested capital at x${multiplier.toFixed(2)}. Added (+${gains} Ledger Points).`,
      color: "#2c1a04",
    });
    updateScore(gains, false);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="screen active">
      <h2>FOLIO VII: COLONIAL INFLATION LEDGER</h2>
      <p style={{ textAlign: "center", color: "#555", fontStyle: "italic" }}>
        War debts induce steep price fluctuations across global markets. Deploy
        asset capital, watch the market trend, and divest before collapse!
      </p>
      <div className="ticker-window">
        <div
          style={{
            fontSize: "12px",
            color: "#666",
            fontStyle: "italic",
            letterSpacing: "1px",
          }}
        >
          MARKET VALUE MULTIPLIER
        </div>
        <div
          style={{
            fontSize: "48px",
            fontFamily: "Georgia, serif",
            fontWeight: "bold",
            margin: "15px 0",
            color:
              multiplier === 0 ? "#cc3300" : isInvested ? "#b8860b" : "#556b2f",
          }}
        >
          {multiplier === 0 ? "BUBBLE BURST" : `x${multiplier.toFixed(2)}`}
        </div>
        <div style={{ color: "#2c1a04", fontSize: "13px", fontWeight: "bold" }}>
          {status}
        </div>
      </div>
      <div className="feedback" style={{ color: feedback.color }}>
        {feedback.text}
      </div>
      <div style={{ textAlign: "center" }}>
        {!isInvested ? (
          <button
            className="btn btn-inline"
            style={{ borderColor: "#556b2f", color: "#556b2f" }}
            onClick={() => {
              setMultiplier(1.0);
              startInvestment();
            }}
          >
            {multiplier === 1
              ? "Underwrite Colonial Merchant Venture"
              : "Launch New Trading Voyage"}
          </button>
        ) : (
          <button
            className="btn btn-inline"
            style={{ borderColor: "#b8860b", color: "#b8860b" }}
            onClick={cashOut}
          >
            Liquidate Assets to Specie Immediately
          </button>
        )}
        <br />
        <button
          className="btn btn-inline"
          style={{ borderColor: "#8b4513", color: "#8b4513" }}
          onClick={() => {
            clearInterval(intervalRef.current);
            onExit();
          }}
        >
          Return to Library
        </button>
      </div>
    </div>
  );
}
