import React from 'react';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';
import CartSummary from '../components/cart/CartSummary';

// Dados de exemplo para demonstração
const cartItems = [
  { id: '1', name: 'Produto 1', price: 29.99, quantity: 2, image: '/images/product1.jpg' },
  { id: '3', name: 'Produto 3', price: 19.99, quantity: 1, image: '/images/product3.jpg' },
  { id: '5', name: 'Produto 5', price: 59.99, quantity: 1, image: '/images/product5.jpg' },
];

const CartPage: React.FC = () => {
  const { t } = useTranslation('common');
  
  const handleUpdateQuantity = (id: string, quantity: number) => {
    // Em uma implementação real, aqui atualizaria a quantidade do item no carrinho
    console.log(`Atualizar quantidade do item ${id} para ${quantity}`);
  };
  
  const handleRemoveItem = (id: string) => {
    // Em uma implementação real, aqui removeria o item do carrinho
    console.log(`Remover item ${id} do carrinho`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>
        
        <CartSummary 
          items={cartItems} 
          onUpdateQuantity={handleUpdateQuantity} 
          onRemove={handleRemoveItem} 
        />
      </div>
    </Layout>
  );
};

export default CartPage;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
