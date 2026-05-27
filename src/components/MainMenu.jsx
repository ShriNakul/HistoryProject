import React from "react";

export default function MainMenu({ onSelectNode, playSound }) {
  const chapters = [
    {
      id: "sort",
      name: "Folio I: Chronological Timeline Calibration",
      desc: "Reconstruct historical records sequentially.",
    },
    {
      id: "quiz",
      name: "Folio II: Imperial Examination",
      desc: "Test historical knowledge against colonial records.",
    },
    {
      id: "writing",
      name: "Folio III: Document Transcription",
      desc: "Verify source transcripts using critical keywords.",
    },
    {
      id: "decrypt",
      name: "Folio IV: Parchment Fragment Reconstruction",
      desc: "Unscramble damaged or illegible archival materials.",
    },
    {
      id: "hl",
      name: "Folio V: Historical Sequence Analysis",
      desc: "Determine relative chronology of epochal events.",
    },
    {
      id: "map",
      name: "Folio VI: Cartographic Reconnaissance",
      desc: "Pinpoint tactical outposts on regional maps.",
    },
    {
      id: "market",
      name: "Folio VII: Colonial Inflation Ledger",
      desc: "Navigate wartime economic volatility and speculative bubbles.",
    },
  ];

  return (
    <div className="screen active">
      <h1 style={{ fontFamily: "Georgia, serif", letterSpacing: "1px" }}>
        THE CANADIAN HISTORIC CHRONICLES
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "#555",
          fontStyle: "italic",
          marginBottom: "30px",
        }}
      >
        Select a historical folio to reconstruct and authenticate missing
        records from the 18th century.
      </p>
      <div className="ledger-menu">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            className="btn ledger-btn"
            onClick={() => {
              playSound("click");
              onSelectNode(chapter.id);
            }}
          >
            <div
              style={{ fontWeight: "bold", fontSize: "16px", color: "#2c1a04" }}
            >
              {chapter.name}
            </div>
            <div style={{ fontSize: "13px", color: "#665" }}>
              {chapter.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
