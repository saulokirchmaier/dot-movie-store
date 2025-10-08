import { createFileRoute } from '@tanstack/react-router';
import { Layout } from '@/components/Layout';
import { CheckoutHeader, CheckoutContent } from '@/components/Checkout';

export const Route = createFileRoute('/checkout')({
  component: CheckoutPage,
});

function CheckoutPage() {
  return (
    <Layout disableSearch={true}>
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <CheckoutHeader />
        <CheckoutContent />
      </div>
    </Layout>
  );
}
