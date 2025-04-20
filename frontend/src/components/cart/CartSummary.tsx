import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import CartItem from './CartItem';

interface CartSummaryProps {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ items, onUpdateQuantity, onRemove }) => {
  const { t } = useTranslation('common');

  // Calcular subtotal
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Valores fixos para exemplo (seriam calculados dinamicamente)
  const shipping = items.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.23; // IVA de 23%
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold mb-6">{t('cart.title')}</h2>
        <p className="text-gray-500 mb-6">{t('cart.empty')}</p>
        <Link href="/products" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
          {t('cart.continueShopping')}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold">{t('cart.title')}</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            image={item.image}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="p-6 bg-gray-50">
        <div className="space-y-2 mb-6">
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
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
            <span>{t('cart.total')}</span>
            <span>{total.toFixed(2)}€</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Link href="/products" className="inline-block text-center bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300">
            {t('cart.continueShopping')}
          </Link>
          <Link href="/checkout" className="inline-block text-center bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            {t('cart.checkout')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
