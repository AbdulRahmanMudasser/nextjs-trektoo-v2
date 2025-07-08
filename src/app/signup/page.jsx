'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

function SignupForm() {
  const { register, authError, authSuccess, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect') || '/';
      const queryString = searchParams.toString();
      router.push(queryString ? `${redirect}?${queryString}` : redirect);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register({
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        term: e.target.terms.checked,
      });
      // Redirect to login with the same redirect query
      const redirect = searchParams.get('redirect') || '/';
      const queryString = searchParams.toString();
      router.push(
        queryString
          ? `/login?redirect=${encodeURIComponent(redirect)}&${queryString}`
          : '/login'
      );
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        {authError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm whitespace-pre-line">
            {authError}
          </div>
        )}

        {authSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm">
            {authSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">First Name</label>
              <input
                name="first_name"
                type="text"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Last Name</label>
              <input
                name="last_name"
                type="text"
                required
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex items-center">
            <input name="terms" type="checkbox" required className="mr-2" />
            <label className="text-sm">I agree to the terms</label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link href="/login" className="text-blue-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
