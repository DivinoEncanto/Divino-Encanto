import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  name: string;
  image?: string;
  productCount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image, productCount }) => {
  const { t } = useTranslation('common');

  return (
    <Link href={`/categories/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <div 
          className="h-40 bg-cover bg-center" 
          style={{ backgroundImage: image ? `url(${image})` : 'none', backgroundColor: image ? 'transparent' : '#f3f4f6' }}
        >
          {!image && (
            <div className="h-full w-full flex items-center justify-center">
              <span className="text-gray-400">Sem imagem</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
          <p className="text-sm text-gray-500">{productCount} produtos</p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
