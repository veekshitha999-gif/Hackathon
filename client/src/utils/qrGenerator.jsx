import React from 'react';

/**
 * Lightweight SVG QR-Style Visual Component for Lobby Room Join
 */
export function QRCodeVisual({ text, size = 160 }) {
  const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const seed = hashString(text || 'ROOM');
  const gridSize = 11;
  const cellSize = size / gridSize;

  const cells = [];
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const isCorner =
        (r < 3 && c < 3) ||
        (r < 3 && c >= gridSize - 3) ||
        (r >= gridSize - 3 && c < 3);

      const isCornerBorder =
        (r === 0 || r === 2 || c === 0 || c === 2) && (r <= 2 && c <= 2) ||
        (r === 0 || r === 2 || c === gridSize - 1 || c === gridSize - 3) && (r <= 2 && c >= gridSize - 3) ||
        (r === gridSize - 1 || r === gridSize - 3 || c === 0 || c === 2) && (r >= gridSize - 3 && c <= 2);

      const isCornerCenter =
        (r === 1 && c === 1) ||
        (r === 1 && c === gridSize - 2) ||
        (r === gridSize - 2 && c === 1);

      let isFilled = false;

      if (isCornerBorder || isCornerCenter) {
        isFilled = true;
      } else if (!isCorner) {
        const val = Math.abs(Math.sin(seed * (r + 1) * 17 + c * 31));
        isFilled = val > 0.45;
      }

      if (isFilled) {
        cells.push(
          <rect
            key={`${r}-${c}`}
            x={c * cellSize}
            y={r * cellSize}
            width={cellSize - 0.5}
            height={cellSize - 0.5}
            fill="#a855f7"
            rx={1.5}
          />
        );
      }
    }
  }

  return (
    <div className="bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <rect width={size} height={size} fill="white" rx={8} />
        {cells}
      </svg>
    </div>
  );
}
