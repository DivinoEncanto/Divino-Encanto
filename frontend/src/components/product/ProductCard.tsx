import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, inStock }) => {
  const { t } = useTranslation('common');

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/products/${id}`}>
        <div className="relative h-64 w-full">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Sem imagem</span>
            </div>
          )}
          {!inStock && (
            <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded">
              {t('products.outOfStock')}
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 truncate">{name}</h3>
        </Link>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">{price.toFixed(2)}€</span>
          <button
            disabled={!inStock}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {t('products.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
