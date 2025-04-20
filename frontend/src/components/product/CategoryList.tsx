import React from 'react';
import { useTranslation } from 'next-i18next';
import CategoryCard from './CategoryCard';

interface CategoryListProps {
  categories: Array<{
    id: string;
    name: string;
    image?: string;
    productCount: number;
  }>;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const { t } = useTranslation('common');

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Nenhuma categoria encontrada.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          id={category.id}
          name={category.name}
          image={category.image}
          productCount={category.productCount}
        />
      ))}
    </div>
  );
};

export default CategoryList;
