import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function getRandomAngle(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function Header() {
  const [angles, setAngles] = useState<number[]>([]);

  useEffect(() => {
    const firstAngle = Math.random() < 0.5 ? 
      getRandomAngle(-3, -1) : 
      getRandomAngle(1, 3);
    
    const angles = [
      firstAngle,
      firstAngle < 0 ? getRandomAngle(1, 3) : getRandomAngle(-3, -1),
      firstAngle < 0 ? getRandomAngle(-3, -1) : getRandomAngle(1, 3),
      firstAngle < 0 ? getRandomAngle(1, 3) : getRandomAngle(-3, -1)
    ];
    
    setAngles(angles);
  }, []);

  return (
    <header className="bg-[#bf273a] text-white relative z-10">
      <div className="container mx-auto h-[40px] md:h-[50px] flex items-center justify-center max-w-[1200px]">
        <nav className="hidden md:flex gap-8">
          <Link to="/report" className="relative font-poppins hover:scale-105 transition-transform duration-200 px-4 py-2 text-[#bf273a]">
            <div className="absolute inset-0 bg-[#ffddb9]" style={{
              transform: `rotate(0deg) skew(0deg)`,
              clipPath: 'polygon(0 15%, 2% 8%, 5% 0, 15% 2%, 85% 0, 95% 3%, 100% 15%, 98% 45%, 100% 65%, 97% 85%, 100% 100%, 85% 98%, 65% 100%, 35% 98%, 0 100%, 3% 75%, 2% 45%)',
              zIndex: 1
            }}></div>
            <div
              className="absolute inset-0 bg-[#ff9f9f] origin-left transition-all duration-700"
              style={{
                transform: `rotate(0deg) skew(0deg) scaleX(0)`,
                transformOrigin: 'left',
                opacity: 0,
                filter: 'blur(4px)',
                clipPath: 'polygon(0 15%, 2% 8%, 5% 0, 15% 2%, 85% 0, 95% 3%, 100% 15%, 98% 45%, 100% 65%, 97% 85%, 100% 100%, 85% 98%, 65% 100%, 35% 98%, 0 100%, 3% 75%, 2% 45%)'
              }}
            ></div>
            <span className="relative z-20 inline-block" style={{ transform: `rotate(0deg)` }}>
              Dénoncer un comportement abusif
            </span>
          </Link>
          <Link to="/reports" className="relative font-poppins hover:scale-105 transition-transform duration-200 px-4 py-2 text-[#bf273a] group">
            <div className="absolute inset-0 bg-[#ffddb9]" style={{
              transform: `rotate(0deg) skew(0deg)`,
              clipPath: 'polygon(3% 12%, 0 5%, 5% 0, 25% 3%, 75% 0, 95% 2%, 98% 15%, 100% 35%, 97% 65%, 100% 85%, 98% 100%, 65% 97%, 35% 100%, 15% 98%, 0 100%, 2% 85%, 0 55%)',
              zIndex: 1
            }}></div>
            <div
              className="absolute inset-0 bg-[#ff9f9f] origin-left transition-all duration-700"
              style={{
                transform: `rotate(0deg) skew(0deg) scaleX(0)`,
                transformOrigin: 'left',
                opacity: 0,
                filter: 'blur(4px)',
                clipPath: 'polygon(3% 12%, 0 5%, 5% 0, 25% 3%, 75% 0, 95% 2%, 98% 15%, 100% 35%, 97% 65%, 100% 85%, 98% 100%, 65% 97%, 35% 100%, 15% 98%, 0 100%, 2% 85%, 0 55%)'
              }}
            ></div>
            <span className="relative z-20 inline-block" style={{ transform: `rotate(0deg)` }}>
              Consulter les cas répertoriés
            </span>
          </Link>
          <Link to="/faq" className="relative font-poppins hover:scale-105 transition-transform duration-200 px-4 py-2 text-[#bf273a]">
            <div className="absolute inset-0 bg-[#ffddb9]" style={{
              transform: `rotate(0deg) skew(0deg)`,
              clipPath: 'polygon(2% 15%, 0 5%, 4% 0, 45% 2%, 85% 0, 96% 3%, 100% 18%, 98% 45%, 100% 75%, 97% 95%, 100% 100%, 65% 98%, 35% 100%, 15% 97%, 0 100%, 2% 75%, 0 45%)',
              zIndex: 1
            }}></div>
            <div
              className="absolute inset-0 bg-[#ff9f9f] origin-left transition-all duration-700"
              style={{
                transform: `rotate(0deg) skew(0deg) scaleX(0)`,
                transformOrigin: 'left',
                opacity: 0,
                filter: 'blur(4px)',
                clipPath: 'polygon(2% 15%, 0 5%, 4% 0, 45% 2%, 85% 0, 96% 3%, 100% 18%, 98% 45%, 100% 75%, 97% 95%, 100% 100%, 65% 98%, 35% 100%, 15% 97%, 0 100%, 2% 75%, 0 45%)'
              }}
            ></div>
            <span className="relative z-20 inline-block" style={{ transform: `rotate(0deg)` }}>
              Questions fréquentes
            </span>
          </Link>
          <Link to="/donate" className="relative font-poppins hover:scale-105 transition-transform duration-200 px-4 py-2 text-[#bf273a]">
            <div className="absolute inset-0 bg-[#ffddb9]" style={{
              transform: `rotate(0deg) skew(0deg)`,
              clipPath: 'polygon(0 8%, 3% 2%, 8% 0, 35% 3%, 65% 0, 92% 2%, 100% 12%, 97% 35%, 100% 55%, 98% 85%, 100% 100%, 75% 97%, 45% 100%, 25% 98%, 0 100%, 3% 65%, 0 35%)',
              zIndex: 1
            }}></div>
            <div
              className="absolute inset-0 bg-[#ff9f9f] origin-left transition-all duration-700"
              style={{
                transform: `rotate(0deg) skew(0deg) scaleX(0)`,
                transformOrigin: 'left',
                opacity: 0,
                filter: 'blur(4px)',
                clipPath: 'polygon(0 8%, 3% 2%, 8% 0, 35% 3%, 65% 0, 92% 2%, 100% 12%, 97% 35%, 100% 55%, 98% 85%, 100% 100%, 75% 97%, 45% 100%, 25% 98%, 0 100%, 3% 65%, 0 35%)'
              }}
            ></div>
            <span className="relative z-20 inline-block" style={{ transform: `rotate(0deg)` }}>
              Faire un don
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}