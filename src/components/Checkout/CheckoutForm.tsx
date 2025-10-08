import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema } from '@/schemas/checkoutSchema';
import type { CheckoutFormData } from '@/schemas/checkoutSchema';
import { useShoppingCart } from '@/contexts';
import { PersonalDataForm } from './PersonalDataForm';
import { AddressForm } from './AddressForm';
import { OrderSummary } from './OrderSummary';
import { CheckoutDialog } from './CheckoutDialog';

export function CheckoutForm() {
  const { cartItems, clearCart } = useShoppingCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur',
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

    setCustomerName(data.fullName);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    clearCart();
    reset();
  };

  return (
    <>
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

      {/* Dialog de Processamento e Sucesso */}
      <CheckoutDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        customerName={customerName}
      />
    </>
  );
}
