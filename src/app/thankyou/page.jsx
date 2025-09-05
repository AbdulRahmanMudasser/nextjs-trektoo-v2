// app/thankyou/page.jsx
import { Suspense } from 'react';
import ThankYouContent from './ThankYouContent';
import { Loader2 } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-500/10"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200/25 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex items-center justify-center min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-md mx-auto p-8 text-center bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
              <p className="text-gray-600 text-base mt-3 font-montserrat">
                Loading confirmation...
              </p>
            </div>
          </div>
        </main>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
