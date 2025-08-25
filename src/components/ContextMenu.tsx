"use client";

import React, { useEffect, useRef } from 'react';

interface ContextMenuItem {
  id: string;
  label: string;
  icon: JSX.Element;
  onClick: () => void;
  danger?: boolean;
}

interface ContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: ContextMenuItem[]; 
}

export default function ContextMenu({ isOpen, onClose, items }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white dark:bg-[#2A2A2A] rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 min-w-[140px] p-[4px]"
      style={{
        top: '40px',
        left: '141px',
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            item.onClick();
            onClose();
          }}
          className={`w-full flex items-center gap-3 p-[6px_10px_6px_12px] text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            item.danger 
              ? 'text-red-600 dark:text-red-400' 
              : 'text-gray-700 dark:text-gray-200'
          }`}
        >
          <span className="flex-shrink-0">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
