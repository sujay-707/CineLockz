import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function TicketQR({ data }) {
  if (!data) return null;

  return (
    <div className="text-center my-3">
      <QRCodeCanvas
        value={JSON.stringify(data)} // Encode ticket data as JSON
        size={200}                   // QR code size (smaller for frontend)
        bgColor="#ffffff"             // Background color
        fgColor="#000000"             // Foreground color
        level="H"                     // High error correction
      />
    </div>
  );
}
