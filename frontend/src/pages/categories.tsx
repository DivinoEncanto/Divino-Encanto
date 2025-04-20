import React from 'react';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';
import CategoryList from '../components/product/CategoryList';
import SectionTitle from '../components/ui/SectionTitle';

// Dados de exemplo para demonstração
const categories = [
  { id: '1', name: 'Categoria 1', image: '/images/category1.jpg', productCount: 15 },
  { id: '2', name: 'Categoria 2', image: '/images/category2.jpg', productCount: 10 },
  { id: '3', name: 'Categoria 3', image: '/images/category3.jpg', productCount: 8 },
  { id: '4', name: 'Categoria 4', image: '/images/category4.jpg', productCount: 12 },
  { id: '5', name: 'Categoria 5', image: '/images/category5.jpg', productCount: 6 },
  { id: '6', name: 'Categoria 6', image: '/images/category6.jpg', productCount: 9 },
  { id: '7', name: 'Categoria 7', image: '/images/category7.jpg', productCount: 14 },
  { id: '8', name: 'Categoria 8', image: '/images/category8.jpg', productCount: 7 },
];

const CategoriesPage: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <SectionTitle title={t('home.categories')} />
        
        <div className="mt-8">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
