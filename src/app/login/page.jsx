'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';

function LoginForm() {
  const { login, authError, authSuccess, isAuthenticated, isLoading } =
    useAuth();
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
    try {
      await login({
        email: e.target.email.value,
        password: e.target.password.value,
        device_name: 'web',
      });
      // Redirect handled by useEffect after isAuthenticated updates
    } catch (error) {
      // Error handling is done in AuthContext
      console.error('Login error:', error);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-blue-50">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {authError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {authError}
          </div>
        )}

        {authSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
            {authSuccess}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <Link href="/signup" className="text-blue-600 hover:underline">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
