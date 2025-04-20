import React from 'react';
import Layout from '../../components/layout/Layout';
import AccountSidebar from '../../components/account/AccountSidebar';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const WishlistItem: React.FC<{
  item: WishlistItem;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}> = ({ item, onRemove, onAddToCart }) => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-200 rounded-lg overflow-hidden">
      <div className="w-full sm:w-32 h-32 bg-gray-200 flex-shrink-0">
        <img
          src={item.image || "https://via.placeholder.com/128"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow p-4 flex flex-col">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="mt-1 text-sm text-gray-500">
          {item.inStock ? (
            <span className="text-green-600">Em stock</span>
          ) : (
            <span className="text-red-600">Fora de stock</span>
          )}
        </div>
        <div className="mt-2 text-lg font-medium text-gray-900">€{item.price.toFixed(2)}</div>
        <div className="mt-auto pt-4">
          <button
            onClick={() => onAddToCart(item.id)}
            disabled={!item.inStock}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              item.inStock
                ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = React.useState<WishlistItem[]>([
    {
      id: '1',
      name: 'Produto A',
      price: 45.95,
      image: 'https://via.placeholder.com/128',
      inStock: true,
    },
    {
      id: '2',
      name: 'Produto B',
      price: 34.00,
      image: 'https://via.placeholder.com/128',
      inStock: true,
    },
    {
      id: '3',
      name: 'Produto C',
      price: 78.50,
      image: 'https://via.placeholder.com/128',
      inStock: false,
    },
  ]);

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const handleAddToCart = (id: string) => {
    console.log(`Adicionado ao carrinho: ${id}`);
    // Aqui seria feita a chamada à API para adicionar ao carrinho
    alert(`Produto adicionado ao carrinho!`);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <AccountSidebar activeTab="wishlist" />
            </div>
            
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Minha Lista de Desejos</h1>
                
                {wishlistItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">A sua lista de desejos está vazia.</p>
                    <button
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Explorar Produtos
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {wishlistItems.map(item => (
                      <WishlistItem
                        key={item.id}
                        item={item}
                        onRemove={handleRemoveFromWishlist}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Wishlist;
