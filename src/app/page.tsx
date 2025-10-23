'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { mockDestinations } from '@/data/mockDestinations';
import { DestinationCard } from '@/components/destinos/DestinationCard';

export default function Home() {
  const router = useRouter();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleForm = async (action: 'login' | 'register') => {
    if (action === 'login') {
      setShowLoginForm(true);
    } else if (action === 'register') {
      setIsLoading(true);
      try {
        await router.push('/cadastro');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[url('/fundo.png')] bg-center bg-cover bg-no-repeat flex flex-col justify-between">
      <section className="text-center text-white px-6 py-20 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mb-5 text-shadow-lg">
          TripTrack, sua bússola de viagens inclusivas
        </h1>
        <p className="text-xl mb-8 text-shadow max-w-3xl">
          Descubra destinos acessíveis, planeje suas reservas, acompanhe feedbacks reais e converse com quem já viveu cada experiência.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinos"
            className="inline-flex px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
          >
            Explorar destinos
          </Link>
          <Link
            href="/reservas"
            className="inline-flex px-8 py-4 bg-white/90 text-gray-900 font-bold rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Planejar reservas
          </Link>
          <Link
            href="/feedbacks"
            className="inline-flex px-8 py-4 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white"
          >
            Ver feedbacks
          </Link>
          <button
            onClick={() => toggleForm('login')}
            className="inline-flex px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            disabled={isLoading}
            aria-label="Abrir formulário de login"
          >
            {isLoading ? 'Carregando...' : 'Entrar'}
          </button>
          <button
            onClick={() => toggleForm('register')}
            className="inline-flex px-8 py-4 bg-white/90 text-gray-900 font-bold rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
            aria-label="Ir para página de registro"
          >
            {isLoading ? 'Carregando...' : 'Registrar'}
          </button>
        </div>
      </section>

      <section className="bg-white/90 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Destinos Populares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockDestinations
              .slice(0, 3)
              .map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/destinos/busca"
              className="inline-block px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
            >
              Ver Todos os Destinos
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <Link
            href="/destinos/busca"
            className="inline-block px-6 py-3 text-lg text-white bg-primary rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Começar a explorar destinos"
          >
            Começar a Explorar
          </Link>
        </div>
      </section>

      {/* Formulário de Login */}
      {showLoginForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</h2>
              <button
                onClick={() => setShowLoginForm(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-1"
                aria-label="Fechar modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Digite seu e-mail"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="lembrar"
                    name="lembrar"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="lembrar" className="ml-2 block text-sm text-gray-700">
                    Lembrar-me
                  </label>
                </div>
                <Link href="/recuperar-senha" className="text-sm text-primary hover:text-primary-dark">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
                >
                  Entrar
                </button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center py-2.5 px-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285f4]"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285f4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34a853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#fbbc05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#ea4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center py-2.5 px-4 bg-[#1877f2] text-white rounded-lg hover:bg-[#166fe5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877f2]"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.88C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    Facebook
                  </button>
                </div>
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Não tem uma conta?{' '}
                  <Link href="/cadastro" className="text-primary hover:text-primary-dark font-medium">
                    Registre-se
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
