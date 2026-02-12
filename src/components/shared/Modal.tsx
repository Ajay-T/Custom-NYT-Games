"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-warm-gray hover:text-foreground text-xl leading-none"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-rose mb-4 text-center">{title}</h2>
        <div className="text-center">{children}</div>
      </div>
    </div>
  );
}
