'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: { [key: string]: string } = {
    Configuration: "Houve um problema com a configuração do servidor.",
    AccessDenied: "Você não tem permissão para acessar este recurso.",
    Verification: "O link de verificação expirou ou já foi usado.",
    Default: "Ocorreu um erro durante a autenticação.",
  };

  const message = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Erro de Autenticação
          </h1>
          <p className="text-gray-600 mb-8">
            {message}
          </p>
          <div className="space-y-4">
            <Link
              href="/login"
              className="block w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            >
              Voltar para o Login
            </Link>
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
