import React from "react";

export default function ScoreHUD({ score, combo, onReset }) {
  const getRank = (val) => {
    if (val >= 1200) return "GRAND CHRONICLER OF EMPIRE";
    if (val >= 300) return "MASTER ARCHIVIST";
    return "CHRONICLE SCRIBE";
  };

  return (
    <div className="stats">
      <div className="hud-metric">
        SCRIBE STATUS:{" "}
        <span id="rank-display" style={{ fontStyle: "italic" }}>
          {getRank(score)}
        </span>
      </div>
      <div className="hud-metric" style={{ color: "#8b4513" }}>
        HISTORIC FOCUS: <span>{combo}x Merit</span>
      </div>
      <div className="hud-metric" style={{ color: "#2c1a04" }}>
        CHRONICLE POINTS:{" "}
        <span style={{ fontWeight: "bold" }}>
          {String(score).padStart(4, "0")}
        </span>
        <span className="reset-link" onClick={onReset}>
          {" "}
          [FORGET RECORD]
        </span>
      </div>
    </div>
  );
}
