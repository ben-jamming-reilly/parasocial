"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  close: () => void;
}

export default function Modal({ children, close }: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted
    ? createPortal(
        <div
          className="fixed top-0 z-20 flex min-h-screen  w-screen flex-col justify-center bg-black bg-opacity-50"
          onClick={close}
        >
          {children}
        </div>,
        document.body
      )
    : null;
}
