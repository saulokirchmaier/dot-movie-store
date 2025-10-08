import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
}: ModalProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Usa requestAnimationFrame duplo para garantir que o DOM foi renderizado
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      // Aguarda a animação terminar antes de desmontar
      const timer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Fecha modal com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop com fade in */}
      <div
        className={`
          absolute inset-0 bg-black/60 backdrop-blur-sm
          transition-opacity duration-500 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
      />

      {/* Modal com slide in da direita */}
      <div
        className={`
          relative bg-neutral-800 w-full max-w-md h-full shadow-xl
          transform transition-all duration-500 ease-out
          ${isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-700">
          <h2 className="text-xl font-semibold text-neutral-100">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-700 transition-colors cursor-pointer hover:scale-110 text-neutral-400 hover:text-red-400"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
