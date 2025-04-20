import React from 'react';
import { useTranslation } from 'next-i18next';
import ProductCard from '../product/ProductCard';

interface ProductCarouselProps {
  title: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
  }>;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products }) => {
  const { t } = useTranslation('common');

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
        {products.map((product) => (
          <div key={product.id} className="min-w-[250px]">
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              inStock={product.inStock}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
