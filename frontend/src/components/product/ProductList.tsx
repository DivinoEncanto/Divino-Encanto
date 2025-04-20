import React from 'react';
import { useTranslation } from 'next-i18next';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
  }>;
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { t } = useTranslation('common');

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          inStock={product.inStock}
        />
      ))}
    </div>
  );
};

export default ProductList;
