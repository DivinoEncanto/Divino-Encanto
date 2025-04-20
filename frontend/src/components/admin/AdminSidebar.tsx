import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const AdminSidebar = ({ activeLink }) => {
  const { t } = useTranslation('common');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'chart-pie', href: '/admin' },
    { id: 'products', label: 'Produtos', icon: 'box', href: '/admin/products' },
    { id: 'categories', label: 'Categorias', icon: 'folder', href: '/admin/categories' },
    { id: 'orders', label: 'Encomendas', icon: 'shopping-cart', href: '/admin/orders' },
    { id: 'customers', label: 'Clientes', icon: 'users', href: '/admin/customers' },
    { id: 'payments', label: 'Pagamentos', icon: 'credit-card', href: '/admin/payments' },
    { id: 'settings', label: 'Configurações', icon: 'cog', href: '/admin/settings' },
  ];

  return (
    <div className="bg-gray-800 text-white w-full h-full min-h-screen">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold">Divino Encanto</h2>
        <p className="text-sm text-gray-400">Painel Administrativo</p>
      </div>
      
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <Link href={item.href}>
                <a className={`flex items-center px-4 py-3 ${
                  activeLink === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}>
                  <i className={`fas fa-${item.icon} w-5`}></i>
                  <span className="ml-3">{item.label}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <Link href="/">
          <a className="flex items-center text-gray-300 hover:text-white">
            <i className="fas fa-arrow-left w-5"></i>
            <span className="ml-3">Voltar para a loja</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
