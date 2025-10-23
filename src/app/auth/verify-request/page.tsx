'use client';

import Link from 'next/link';

export default function VerifyRequest() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Verifique seu Email
          </h1>
          <p className="text-gray-600 mb-8">
            Um link de verificação foi enviado para seu email. Por favor, verifique sua caixa de entrada e spam.
          </p>
          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full py-3 px-4 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors"
            >
              Voltar para a Página Inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
