import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="relative bg-[#ffddb9] p-8 rounded-lg max-w-md w-full mx-4"
        style={{
          clipPath: 'polygon(3% 0, 7% 1%, 15% 0, 85% 1%, 93% 0, 97% 2%, 100% 15%, 98% 45%, 100% 75%, 97% 95%, 100% 100%, 65% 98%, 35% 100%, 15% 97%, 0 100%, 2% 75%, 0 45%, 2% 15%)'
        }}
      >
        {children}
      </div>
    </div>
  );
}