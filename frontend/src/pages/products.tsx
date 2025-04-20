import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';
import ProductList from '../components/product/ProductList';
import FilterSidebar from '../components/product/FilterSidebar';
import Pagination from '../components/ui/Pagination';
import SectionTitle from '../components/ui/SectionTitle';

// Dados de exemplo para demonstração
const products = [
  { id: '1', name: 'Produto 1', price: 29.99, image: '/images/product1.jpg', inStock: true },
  { id: '2', name: 'Produto 2', price: 39.99, image: '/images/product2.jpg', inStock: true },
  { id: '3', name: 'Produto 3', price: 19.99, image: '/images/product3.jpg', inStock: false },
  { id: '4', name: 'Produto 4', price: 49.99, image: '/images/product4.jpg', inStock: true },
  { id: '5', name: 'Produto 5', price: 59.99, image: '/images/product5.jpg', inStock: true },
  { id: '6', name: 'Produto 6', price: 29.99, image: '/images/product6.jpg', inStock: true },
  { id: '7', name: 'Produto 7', price: 39.99, image: '/images/product7.jpg', inStock: true },
  { id: '8', name: 'Produto 8', price: 19.99, image: '/images/product8.jpg', inStock: true },
  { id: '9', name: 'Produto 9', price: 49.99, image: '/images/product9.jpg', inStock: true },
  { id: '10', name: 'Produto 10', price: 59.99, image: '/images/product10.jpg', inStock: true },
  { id: '11', name: 'Produto 11', price: 69.99, image: '/images/product11.jpg', inStock: true },
  { id: '12', name: 'Produto 12', price: 79.99, image: '/images/product12.jpg', inStock: true },
];

const categories = [
  { id: '1', name: 'Categoria 1', count: 15 },
  { id: '2', name: 'Categoria 2', count: 10 },
  { id: '3', name: 'Categoria 3', count: 8 },
  { id: '4', name: 'Categoria 4', count: 12 },
];

const priceRanges = [
  { id: 'price_1', label: 'Até 20€', min: 0, max: 20 },
  { id: 'price_2', label: '20€ - 50€', min: 20, max: 50 },
  { id: 'price_3', label: '50€ - 100€', min: 50, max: 100 },
  { id: 'price_4', label: 'Mais de 100€', min: 100, max: null },
];

const ProductsPage: React.FC = () => {
  const { t } = useTranslation('common');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  
  // Simulação de paginação
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Em uma implementação real, aqui faria uma chamada à API para buscar os produtos da página selecionada
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    // Em uma implementação real, aqui faria uma chamada à API para filtrar os produtos por categoria
  };

  const handlePriceRangeChange = (priceRangeId: string | null) => {
    setSelectedPriceRange(priceRangeId);
    setCurrentPage(1);
    // Em uma implementação real, aqui faria uma chamada à API para filtrar os produtos por faixa de preço
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <SectionTitle title={t('products.title')} />
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar de filtros */}
          <div className="w-full md:w-1/4">
            <FilterSidebar
              categories={categories}
              priceRanges={priceRanges}
              selectedCategory={selectedCategory}
              selectedPriceRange={selectedPriceRange}
              onCategoryChange={handleCategoryChange}
              onPriceRangeChange={handlePriceRangeChange}
            />
          </div>
          
          {/* Lista de produtos */}
          <div className="w-full md:w-3/4">
            <ProductList products={currentProducts} />
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
