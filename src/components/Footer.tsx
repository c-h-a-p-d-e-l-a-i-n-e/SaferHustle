import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#bf273a] text-white">
      <div className="container mx-auto h-[50px] md:h-[60px] flex items-center justify-center gap-4 max-w-[1200px]">
        <Link to="/faq" className="font-poppins text-sm hover:scale-105 transition-transform duration-200">
          Aide
        </Link>
      </div>
    </footer>
  );
}