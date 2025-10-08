import { createFileRoute, Link } from '@tanstack/react-router';
import { Layout } from '@/components/Layout';
import { useShoppingCart } from '@/contexts';
import {
  PersonalDataForm,
  AddressForm,
  OrderSummary,
  EmptyCart,
  CheckoutDialog,
} from '@/components/Checkout';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema } from '@/schemas/checkoutSchema';
import type { CheckoutFormData } from '@/schemas/checkoutSchema';
import { useState } from 'react';

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cartItems, clearCart } = useShoppingCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');

  // React Hook Form com Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur', // Valida ao sair do campo
    defaultValues: {
      fullName: '',
      cpf: '',
      phone: '',
      email: '',
      cep: '',
      address: '',
      city: '',
      state: '',
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log('✅ Formulário válido!', data);
    console.log('🛒 Itens do carrinho:', cartItems);

    // Salva o nome do cliente
    setCustomerName(data.fullName);

    // Abre o dialog de processamento/sucesso
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    // Limpa o carrinho e reseta o formulário após fechar o dialog
    clearCart();
    reset();
  };

  return (
    <Layout disableSearch={true}>
      <div className="max-w-[1400px] mx-auto px-4 py-8">
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

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Formulários */}
            <div className="order-2 lg:order-1 lg:col-span-2">
              <PersonalDataForm register={register} errors={errors} />
              <AddressForm register={register} errors={errors} />
            </div>

            {/* Resumo do Pedido */}
            <div className="order-1 lg:order-2 lg:col-span-1">
              <OrderSummary />
            </div>
          </form>
        )}

        {/* Dialog de Processamento e Sucesso */}
        <CheckoutDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          customerName={customerName}
        />
      </div>
    </Layout>
  );
}
