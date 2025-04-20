import React from 'react';
import Layout from '../../components/layout/Layout';
import AccountSidebar from '../../components/account/AccountSidebar';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Orders = () => {
  const [orders, setOrders] = React.useState([
    {
      id: '1001',
      date: '2025-04-15',
      status: 'Entregue',
      total: 125.90,
      items: [
        { id: '1', name: 'Produto A', quantity: 2, price: 45.95 },
        { id: '2', name: 'Produto B', quantity: 1, price: 34.00 }
      ]
    },
    {
      id: '1002',
      date: '2025-04-10',
      status: 'Em processamento',
      total: 78.50,
      items: [
        { id: '3', name: 'Produto C', quantity: 1, price: 78.50 }
      ]
    },
    {
      id: '1003',
      date: '2025-03-28',
      status: 'Entregue',
      total: 156.85,
      items: [
        { id: '4', name: 'Produto D', quantity: 3, price: 29.95 },
        { id: '5', name: 'Produto E', quantity: 1, price: 67.00 }
      ]
    }
  ]);

  const [expandedOrder, setExpandedOrder] = React.useState<string | null>(null);

  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue':
        return 'bg-green-100 text-green-800';
      case 'Em processamento':
        return 'bg-blue-100 text-blue-800';
      case 'Enviado':
        return 'bg-purple-100 text-purple-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <AccountSidebar activeTab="orders" />
            </div>
            
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Minhas Encomendas</h1>
                
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Não tem nenhuma encomenda.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map(order => (
                      <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div 
                          className="bg-gray-50 px-4 py-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer"
                          onClick={() => toggleOrderDetails(order.id)}
                        >
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">Encomenda #{order.id}</h3>
                            <p className="text-sm text-gray-500">
                              {new Date(order.date).toLocaleDateString('pt-PT', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                          </div>
                          
                          <div className="mt-2 sm:mt-0 flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                            <span className="ml-4 text-lg font-medium text-gray-900">
                              €{order.total.toFixed(2)}
                            </span>
                            <svg 
                              className={`ml-2 h-5 w-5 text-gray-500 transform transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        
                        {expandedOrder === order.id && (
                          <div className="px-4 py-4 border-t border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Detalhes da Encomenda</h4>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Produto
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Quantidade
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Preço
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Subtotal
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {order.items.map(item => (
                                    <tr key={item.id}>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.name}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.quantity}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        €{item.price.toFixed(2)}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        €{(item.quantity * item.price).toFixed(2)}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            
                            <div className="mt-4 flex justify-between items-center">
                              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Ver Fatura
                              </button>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="text-lg font-medium text-gray-900">€{order.total.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Orders;
