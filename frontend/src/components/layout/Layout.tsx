import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-2xl font-bold text-gray-800">Divino Encanto</a>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/products">
              <a className="text-gray-600 hover:text-gray-900">Produtos</a>
            </Link>
            <Link href="/categories">
              <a className="text-gray-600 hover:text-gray-900">Categorias</a>
            </Link>
            <Link href="/cart">
              <a className="text-gray-600 hover:text-gray-900">Carrinho</a>
            </Link>
            <Link href="/login">
              <a className="text-gray-600 hover:text-gray-900">Login</a>
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <a className="text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </a>
            </Link>
            <div className="relative">
              <button className="text-gray-600 hover:text-gray-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Divino Encanto</h3>
              <p className="text-gray-300">
                A sua loja online para produtos exclusivos.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/">
                    <a className="text-gray-300 hover:text-white">Início</a>
                  </Link>
                </li>
                <li>
                  <Link href="/products">
                    <a className="text-gray-300 hover:text-white">Produtos</a>
                  </Link>
                </li>
                <li>
                  <Link href="/categories">
                    <a className="text-gray-300 hover:text-white">Categorias</a>
                  </Link>
                </li>
                <li>
                  <Link href="/cart">
                    <a className="text-gray-300 hover:text-white">Carrinho</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Informações</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy">
                    <a className="text-gray-300 hover:text-white">Política de Privacidade</a>
                  </Link>
                </li>
                <li>
                  <Link href="/terms">
                    <a className="text-gray-300 hover:text-white">Termos e Condições</a>
                  </Link>
                </li>
                <li>
                  <Link href="/returns">
                    <a className="text-gray-300 hover:text-white">Política de Reembolsos</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Email: geral@divinoencanto.com</li>
                <li>Telefone: +351 931307266</li>
                <li>NIF: 517772221</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} Divino Encanto Unipessoal Lda. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
