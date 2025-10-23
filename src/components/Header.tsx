'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link 
                href="/destinos" 
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Destinos
              </Link>
            </li>
            <li>
              <Link
                href="/reservas"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Reservas
              </Link>
            </li>
            <li>
              <Link
                href="/feedbacks"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Feedbacks
              </Link>
            </li>
            <li>
              <Link
                href="/chat"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Chat
              </Link>
            </li>
            <li>
              <Link
                href="/sobre"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sobre
              </Link>
            </li>
            {session ? (
              <>
                <li>
                  <Link 
                    href="/perfil" 
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Meu Perfil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    href="/login" 
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/cadastro" 
                    className="px-4 py-2 text-white bg-primary hover:bg-primary-dark rounded-md transition-colors"
                  >
                    Cadastro
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/destinos"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
            >
              Destinos
            </Link>
            <Link
              href="/reservas"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
            >
              Reservas
            </Link>
            <Link
              href="/feedbacks"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
            >
              Feedbacks
            </Link>
            <Link
              href="/chat"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
            >
              Chat
            </Link>
            <Link
              href="/sobre"
              className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
            >
              Sobre
            </Link>
            {session ? (
              <>
                <Link
                  href="/perfil"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                >
                  Meu Perfil
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  href="/cadastro"
                  className="block px-3 py-2 text-base font-medium text-primary hover:text-primary-dark"
                >
                  Cadastro
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
