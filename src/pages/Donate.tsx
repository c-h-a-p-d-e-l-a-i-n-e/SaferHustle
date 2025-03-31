import React, { useState } from 'react';
import { generateRandomClipPath, generateRandomRotation } from '../utils/paperEffect';
import { Heart } from 'lucide-react';

export function Donate() {
  const [showQR, setShowQR] = useState(false);
  
  const walletAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

  return (
    <div className="max-w-[1200px] mx-auto px-8 md:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-3xl font-bold mb-6 flex items-center justify-center gap-3">
            <Heart className="text-[#bf273a]" />
            Faire un don
          </h1>
          <p className="font-poppins text-base mb-8">
            SaferHustle est une plateforme entièrement gratuite et sans publicité, maintenue par des bénévoles. 
            Vos dons nous aident à couvrir les frais d'hébergement et à assurer la pérennité du service.
          </p>
        </div>

        <div
          className="relative bg-[#bf273a] p-8 text-[#ffddb9] mb-8"
          style={{
            clipPath: generateRandomClipPath(),
            transform: generateRandomRotation()
          }}
        >
          <h2 className="text-xl font-semibold mb-4">Comment faire un don?</h2>
          <p className="mb-6">
            Pour garantir votre anonymat, nous acceptons uniquement les dons en Bitcoin. 
            Vous pouvez utiliser l'adresse de notre portefeuille ou scanner le QR code.
          </p>

          <div className="space-y-6">
            <div>
              <button
                onClick={() => setShowQR(!showQR)}
                className="relative font-poppins hover:scale-105 transition-transform duration-200 px-6 py-3 text-[#bf273a] mb-4"
              >
                <div 
                  className="absolute inset-0 bg-[#ffddb9]"
                  style={{
                    clipPath: generateRandomClipPath(),
                    transform: generateRandomRotation(),
                    zIndex: 1
                  }}
                ></div>
                <span className="relative z-20 inline-block">
                  {showQR ? 'Masquer le QR Code' : 'Afficher le QR Code'}
                </span>
              </button>

              {showQR && (
                <div className="bg-white p-4 inline-block rounded">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${walletAddress}`}
                    alt="Bitcoin QR Code"
                    className="w-[120px] h-[120px]"
                  />
                </div>
              )}
            </div>

            <div>
              <p className="text-sm mb-2">Adresse Bitcoin:</p>
              <div className="bg-[#ffddb9] p-3 rounded">
                <code className="text-[#bf273a] break-all">{walletAddress}</code>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm opacity-75">
          <p>Merci de soutenir notre mission de protection et d'entraide.</p>
        </div>
      </div>
    </div>
  );
}