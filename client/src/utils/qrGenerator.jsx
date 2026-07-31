import React, { useState } from 'react';

/**
 * Genuine Scannable QR Code Component
 */
export function QRCodeVisual({ text, size = 180 }) {
  const [imgError, setImgError] = useState(false);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text || 'http://localhost:3000')}`;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-2xl flex flex-col items-center gap-2 border-2 border-purple-400/40">
      {!imgError ? (
        <img
          src={qrUrl}
          alt="Room Join QR Code"
          width={size}
          height={size}
          onError={() => setImgError(true)}
          className="rounded-lg shadow-sm"
        />
      ) : (
        <div className="w-[180px] h-[180px] bg-purple-950 text-white font-mono text-xs flex items-center justify-center p-2 text-center rounded-lg">
          Room Join Link: {text}
        </div>
      )}
      <span className="text-[11px] font-black text-purple-900 tracking-wider uppercase">
        Scan to Join Room
      </span>
    </div>
  );
}
