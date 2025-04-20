import React from 'react';
import { useTranslation } from 'next-i18next';

interface FilterSidebarProps {
  categories: Array<{
    id: string;
    name: string;
    count: number;
  }>;
  priceRanges: Array<{
    id: string;
    label: string;
    min: number;
    max: number | null;
  }>;
  selectedCategory: string | null;
  selectedPriceRange: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  onPriceRangeChange: (priceRangeId: string | null) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  priceRanges,
  selectedCategory,
  selectedPriceRange,
  onCategoryChange,
  onPriceRangeChange
}) => {
  const { t } = useTranslation('common');

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">{t('products.category')}</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onCategoryChange(null)}
              className={`text-left w-full ${
                selectedCategory === null ? 'font-semibold text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('products.allCategories')}
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onCategoryChange(category.id)}
                className={`text-left w-full ${
                  selectedCategory === category.id ? 'font-semibold text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {category.name} <span className="text-gray-500">({category.count})</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">{t('products.price')}</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onPriceRangeChange(null)}
              className={`text-left w-full ${
                selectedPriceRange === null ? 'font-semibold text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Todos os preços
            </button>
          </li>
          {priceRanges.map((range) => (
            <li key={range.id}>
              <button
                onClick={() => onPriceRangeChange(range.id)}
                className={`text-left w-full ${
                  selectedPriceRange === range.id ? 'font-semibold text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
