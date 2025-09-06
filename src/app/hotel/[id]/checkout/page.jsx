import { Suspense } from 'react';
import CheckoutContent from './CheckoutContent';
import { CheckoutPageLoader } from '@/components/ui/PageLoader';

export default async function CheckoutPage({ params }) {
  const { id } = await params;

  return (
    <Suspense fallback={<CheckoutPageLoader message="Loading checkout..." />}>
      <CheckoutContent id={id} />
    </Suspense>
  );
}
