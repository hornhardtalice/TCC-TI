import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
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
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            </li>
            <li>
              <Link href="/cadastro" className="text-gray-600 hover:text-gray-900">
                Cadastro
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
