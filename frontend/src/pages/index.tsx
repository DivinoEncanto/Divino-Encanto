import React from 'react';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';
import HeroBanner from '../components/ui/HeroBanner';
import SectionTitle from '../components/ui/SectionTitle';
import ProductCarousel from '../components/ui/ProductCarousel';
import CategoryList from '../components/product/CategoryList';
import NewsletterSignup from '../components/ui/NewsletterSignup';

// Dados de exemplo para demonstração
const featuredProducts = [
  { id: '1', name: 'Produto 1', price: 29.99, image: '/images/product1.jpg', inStock: true },
  { id: '2', name: 'Produto 2', price: 39.99, image: '/images/product2.jpg', inStock: true },
  { id: '3', name: 'Produto 3', price: 19.99, image: '/images/product3.jpg', inStock: false },
  { id: '4', name: 'Produto 4', price: 49.99, image: '/images/product4.jpg', inStock: true },
  { id: '5', name: 'Produto 5', price: 59.99, image: '/images/product5.jpg', inStock: true },
];

const newProducts = [
  { id: '6', name: 'Produto 6', price: 29.99, image: '/images/product6.jpg', inStock: true },
  { id: '7', name: 'Produto 7', price: 39.99, image: '/images/product7.jpg', inStock: true },
  { id: '8', name: 'Produto 8', price: 19.99, image: '/images/product8.jpg', inStock: true },
  { id: '9', name: 'Produto 9', price: 49.99, image: '/images/product9.jpg', inStock: true },
  { id: '10', name: 'Produto 10', price: 59.99, image: '/images/product10.jpg', inStock: true },
];

const categories = [
  { id: '1', name: 'Categoria 1', image: '/images/category1.jpg', productCount: 15 },
  { id: '2', name: 'Categoria 2', image: '/images/category2.jpg', productCount: 10 },
  { id: '3', name: 'Categoria 3', image: '/images/category3.jpg', productCount: 8 },
  { id: '4', name: 'Categoria 4', image: '/images/category4.jpg', productCount: 12 },
];

const HomePage: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <HeroBanner
        title={t('home.welcome')}
        subtitle="Descubra a nossa coleção exclusiva de produtos"
        imageUrl="/images/banner.jpg"
        buttonText="Ver Produtos"
        buttonLink="/products"
      />

      <div className="container mx-auto px-4 py-12">
        <SectionTitle
          title={t('home.featured')}
          actionLink="/products"
          actionText={t('home.viewAll')}
        />
        <ProductCarousel title="" products={featuredProducts} />

        <div className="mt-16">
          <SectionTitle
            title={t('home.new')}
            actionLink="/products?sort=newest"
            actionText={t('home.viewAll')}
          />
          <ProductCarousel title="" products={newProducts} />
        </div>

        <div className="mt-16">
          <SectionTitle
            title={t('home.categories')}
            actionLink="/categories"
            actionText={t('home.viewAll')}
          />
          <CategoryList categories={categories} />
        </div>
      </div>

      <NewsletterSignup />
    </Layout>
  );
};

export default HomePage;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
