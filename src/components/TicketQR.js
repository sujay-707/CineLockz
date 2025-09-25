import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function TicketQR({ data }) {
  return (
    <div className="text-center my-3">
      <QRCodeCanvas
        value={JSON.stringify(data)} // Encode ticket data as JSON for QR
        size={256}                  // QR code size
        bgColor="#ffffff"           // Background color
        fgColor="#000000"           // Foreground color
        level="H"                   // High error correction
      />
    </div>
  );
}
