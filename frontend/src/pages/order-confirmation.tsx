import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';

const OrderConfirmationPage: React.FC = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { id } = router.query;
  
  // Dados simulados do pedido
  const orderData = {
    id: id || '123456',
    date: new Date().toLocaleDateString('pt-PT'),
    status: 'Pago',
    paymentMethod: 'PayPal',
    items: [
      { id: 1, name: 'Produto 1', price: 29.99, quantity: 1 },
      { id: 2, name: 'Produto 2', price: 19.99, quantity: 2 },
    ],
    subtotal: 69.97,
    shipping: 5.99,
    tax: 16.09,
    total: 92.05,
    shippingAddress: {
      name: 'Cliente Exemplo',
      address: 'Rua Exemplo, 123',
      postalCode: '1000-000',
      city: 'Lisboa',
      country: 'Portugal'
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Encomenda Confirmada!</h1>
            <p className="text-lg text-gray-600">Obrigado pela sua compra.</p>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="flex justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Detalhes da Encomenda</h2>
                <p className="text-gray-600">#{orderData.id}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Data: {orderData.date}</p>
                <p className="text-gray-600">Estado: <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{orderData.status}</span></p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 pb-4">
              <h3 className="text-md font-medium text-gray-900 mb-2">Produtos</h3>
              {orderData.items.map((item) => (
                <div key={item.id} className="flex justify-between py-2">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-600 ml-2">x {item.quantity}</span>
                  </div>
                  <span className="font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 pb-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>€{orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envio</span>
                  <span>€{orderData.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IVA (23%)</span>
                  <span>€{orderData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>€{orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">Método de Pagamento</h3>
                  <p className="text-gray-600">{orderData.paymentMethod}</p>
                </div>
                
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">Endereço de Envio</h3>
                  <p className="text-gray-600">{orderData.shippingAddress.name}</p>
                  <p className="text-gray-600">{orderData.shippingAddress.address}</p>
                  <p className="text-gray-600">{orderData.shippingAddress.postalCode} {orderData.shippingAddress.city}</p>
                  <p className="text-gray-600">{orderData.shippingAddress.country}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">Enviámos um email de confirmação para o seu endereço de email.</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => router.push('/')}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Voltar à Loja
              </button>
              <button
                onClick={() => router.push('/account/orders')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Ver Minhas Encomendas
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
