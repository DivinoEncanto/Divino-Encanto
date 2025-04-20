import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

interface CheckoutFormProps {
  onSubmit: (data: any) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const { t } = useTranslation('common');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementada a lógica para coletar os dados do formulário
    // e passá-los para a função onSubmit
    onSubmit({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">{t('checkout.title')}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{t('checkout.shippingAddress')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Sobrenome
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Endereço
              </label>
              <input
                type="text"
                id="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Cidade
              </label>
              <input
                type="text"
                id="city"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                Código Postal
              </label>
              <input
                type="text"
                id="postalCode"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                País
              </label>
              <select
                id="country"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Selecione um país</option>
                <option value="PT">Portugal</option>
                <option value="ES">Espanha</option>
                <option value="FR">França</option>
                <option value="DE">Alemanha</option>
                <option value="UK">Reino Unido</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{t('checkout.paymentMethod')}</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 border border-gray-300 rounded-md">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="PayPal"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                PayPal
              </label>
            </div>
            <div className="flex items-center p-4 border border-gray-300 rounded-md">
              <input
                type="radio"
                id="stripe"
                name="paymentMethod"
                value="Stripe"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="stripe" className="ml-3 block text-sm font-medium text-gray-700">
                Cartão de Crédito (Stripe)
              </label>
            </div>
            <div className="flex items-center p-4 border border-gray-300 rounded-md">
              <input
                type="radio"
                id="klarna"
                name="paymentMethod"
                value="Klarna"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="klarna" className="ml-3 block text-sm font-medium text-gray-700">
                Klarna
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Link href="/cart" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Voltar ao Carrinho
          </Link>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {t('checkout.placeOrder')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
