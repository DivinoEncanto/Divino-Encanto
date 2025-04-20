import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove
}) => {
  const { t } = useTranslation('common');
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
        <div className="relative h-20 w-20 flex-shrink-0 mr-4">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded"
              sizes="80px"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded">
              <span className="text-gray-400 text-xs">Sem imagem</span>
            </div>
          )}
        </div>
        
        <div className="text-center sm:text-left">
          <Link href={`/products/${id}`} className="text-lg font-medium text-gray-800 hover:text-blue-600">
            {name}
          </Link>
          <p className="text-gray-600">{price.toFixed(2)}€</p>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="flex items-center border border-gray-300 rounded">
          <button
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            -
          </button>
          <span className="px-4 py-1">{quantity}</span>
          <button
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
        
        <button
          className="ml-4 text-red-500 hover:text-red-700"
          onClick={() => onRemove(id)}
        >
          {t('cart.remove')}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
