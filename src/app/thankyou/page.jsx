// app/thankyou/page.jsx
import { Suspense } from 'react';
import ThankYouContent from './ThankYouContent';
import { CheckoutPageLoader } from '@/components/ui/PageLoader';

export default function ThankYouPage() {
  return (
    <Suspense fallback={<CheckoutPageLoader message="Loading confirmation..." />}>
      <ThankYouContent />
    </Suspense>
  );
}
