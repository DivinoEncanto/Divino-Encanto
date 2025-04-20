import React from 'react';
import { useTranslation } from 'next-i18next';

interface OrderItemProps {
  order: {
    id: string;
    date: string;
    status: string;
    total: number;
    items: number;
    trackingNumber?: string;
  };
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const { t } = useTranslation('common');
  
  // Função para determinar a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Função para traduzir o status
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'processing':
        return 'Em processamento';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregue';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <p className="text-sm text-gray-500">Pedido #{order.id}</p>
          <p className="text-sm text-gray-500">{order.date}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <p className="font-medium">{order.items} {order.items === 1 ? 'item' : 'itens'}</p>
          <p className="text-lg font-bold">{order.total.toFixed(2)}€</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-2">
          {order.trackingNumber && (
            <a 
              href={`https://gls-group.eu/PT/pt/seguir-encomenda?match=${order.trackingNumber}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Rastrear Encomenda
            </a>
          )}
          <a 
            href={`/account/orders/${order.id}`} 
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Ver Detalhes
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
