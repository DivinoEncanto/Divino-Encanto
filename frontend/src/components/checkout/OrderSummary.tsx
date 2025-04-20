import React from 'react';
import { useTranslation } from 'next-i18next';

interface OrderSummaryProps {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  const { t } = useTranslation('common');

  // Calcular subtotal
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Valores fixos para exemplo (seriam calculados dinamicamente)
  const shipping = items.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.23; // IVA de 23%
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">{t('checkout.orderSummary')}</h3>
      
      <div className="border-t border-b border-gray-200 py-4 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between py-2">
            <div>
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-600 ml-2">x {item.quantity}</span>
            </div>
            <span>{(item.price * item.quantity).toFixed(2)}€</span>
          </div>
        ))}
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>{t('cart.subtotal')}</span>
          <span>{subtotal.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between">
          <span>{t('cart.shipping')}</span>
          <span>{shipping.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between">
          <span>{t('cart.tax')}</span>
          <span>{tax.toFixed(2)}€</span>
        </div>
      </div>
      
      <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-200">
        <span>{t('cart.total')}</span>
        <span>{total.toFixed(2)}€</span>
      </div>
    </div>
  );
};

export default OrderSummary;
