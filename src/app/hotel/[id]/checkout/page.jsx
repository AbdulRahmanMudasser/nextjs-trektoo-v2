// app/hotel/[id]/checkout/page.jsx
import { Suspense } from 'react';
import CheckoutContent from './CheckoutContent';
import { Loader2 } from 'lucide-react';

export default function CheckoutPage({ params }) {
  const { id } = params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 bg-[url('/pattern.png')] bg-cover bg-fixed">
          <div className="max-w-md mx-auto p-8 text-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
            <p className="text-gray-600 text-base mt-3 font-montserrat">
              Loading checkout...
            </p>
          </div>
        </div>
      }
    >
      <CheckoutContent id={id} />
    </Suspense>
  );
}
