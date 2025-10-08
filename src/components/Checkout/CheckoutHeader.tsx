import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';

export function CheckoutHeader() {
  return (
    <div className="flex justify-start items-start">
      <Link
        to="/"
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2"
      >
        <ArrowLeft size={24} />
        Voltar
      </Link>
      <div className="flex-1 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      </div>
    </div>
  );
}
