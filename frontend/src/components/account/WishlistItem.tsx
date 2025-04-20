import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

interface WishlistItemProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
  };
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ product, onRemove, onAddToCart }) => {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-gray-200">
      <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
        <div className="relative h-20 w-20 flex-shrink-0 mr-4">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
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
          <a href={`/products/${product.id}`} className="text-lg font-medium text-gray-800 hover:text-blue-600">
            {product.name}
          </a>
          <p className="text-gray-600">{product.price.toFixed(2)}€</p>
          <p className={product.inStock ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
            {product.inStock ? 'Em stock' : t('products.outOfStock')}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => onAddToCart(product.id)}
          disabled={!product.inStock}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            product.inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {t('products.addToCart')}
        </button>
        
        <button
          onClick={() => onRemove(product.id)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300"
        >
          {t('cart.remove')}
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;
