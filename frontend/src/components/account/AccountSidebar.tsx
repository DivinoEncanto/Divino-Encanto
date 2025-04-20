import React from 'react';
import Link from 'next/link';

interface AccountSidebarProps {
  activeTab?: string;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ activeTab = 'profile' }) => {
  const menuItems = [
    { id: 'profile', label: 'Perfil', href: '/account/profile' },
    { id: 'orders', label: 'Encomendas', href: '/account/orders' },
    { id: 'addresses', label: 'Endereços', href: '/account/addresses' },
    { id: 'wishlist', label: 'Lista de Desejos', href: '/account/wishlist' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Minha Conta</h2>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link href={item.href}>
                <a
                  className={`block px-4 py-2 rounded-md ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          className="w-full px-4 py-2 text-red-600 hover:text-red-800 text-left"
        >
          Terminar Sessão
        </button>
      </div>
    </div>
  );
};

export default AccountSidebar;
