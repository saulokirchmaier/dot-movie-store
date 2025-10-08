import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
}

export function CheckoutDialog({
  isOpen,
  onClose,
  customerName,
}: CheckoutDialogProps) {
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setIsProcessing(true);

      const timer = setTimeout(() => {
        setIsProcessing(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleGoToStore = () => {
    onClose();
    navigate({ to: '/' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="h-16 w-16 text-emerald-500 animate-spin mb-4" />
            <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">
              Processando seu pedido...
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              Aguarde enquanto finalizamos sua compra
            </DialogDescription>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2">
            <div className="mb-6 rounded-full bg-emerald-100 p-4">
              <CheckCircle2 className="h-16 w-16 text-emerald-600" />
            </div>

            <DialogHeader className="text-center space-y-3">
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Obrigado, {customerName}!
              </DialogTitle>
              <DialogDescription className="text-lg text-gray-700">
                Sua compra foi finalizada com sucesso! 🎉
              </DialogDescription>
            </DialogHeader>

            <div className="mt-8 w-full">
              <Button
                onClick={handleGoToStore}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg"
              >
                Ir para loja
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
