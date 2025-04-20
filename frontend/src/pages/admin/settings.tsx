import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable from '../../components/admin/DataTable';
import ActionButton from '../../components/admin/ActionButton';
import Modal from '../../components/admin/Modal';
import FormGroup from '../../components/admin/FormGroup';
import AdminPagination from '../../components/admin/AdminPagination';

const AdminSettings: React.FC = () => {
  const { t } = useTranslation('common');
  
  // Estados
  const [activeTab, setActiveTab] = useState('general');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(null);
  
  // Dados de exemplo para demonstração
  const paymentMethods = [
    { id: '1', name: 'PayPal', description: 'Pagamento via PayPal', active: true },
    { id: '2', name: 'Google Pay', description: 'Pagamento via Google Pay', active: true },
    { id: '3', name: 'Amazon Pay', description: 'Pagamento via Amazon Pay', active: false },
    { id: '4', name: 'Klarna', description: 'Pagamento via Klarna', active: false },
    { id: '5', name: 'Stripe', description: 'Pagamento via Stripe', active: true },
    { id: '6', name: 'Apple Pay', description: 'Pagamento via Apple Pay', active: false },
  ];
  
  const shippingMethods = [
    { id: '1', name: 'GLS', description: 'Envio via GLS', price: '€5.99', active: true },
    { id: '2', name: 'CTT', description: 'Envio via CTT', price: '€4.99', active: true },
    { id: '3', name: 'DHL', description: 'Envio via DHL', price: '€7.99', active: false },
    { id: '4', name: 'UPS', description: 'Envio via UPS', price: '€8.99', active: false },
  ];
  
  // Configuração da tabela de métodos de pagamento
  const paymentColumns = [
    { id: 'name', label: 'Nome' },
    { id: 'description', label: 'Descrição' },
    { 
      id: 'active', 
      label: 'Estado',
      render: (method) => {
        const statusClasses = {
          true: 'bg-green-100 text-green-800',
          false: 'bg-gray-100 text-gray-800',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[method.active]}`}>
            {method.active ? 'Ativo' : 'Inativo'}
          </span>
        );
      }
    },
    {
      id: 'actions',
      label: 'Ações',
      render: (method) => (
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handlePaymentClick(method);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
      )
    },
  ];
  
  // Configuração da tabela de métodos de envio
  const shippingColumns = [
    { id: 'name', label: 'Nome' },
    { id: 'description', label: 'Descrição' },
    { id: 'price', label: 'Preço' },
    { 
      id: 'active', 
      label: 'Estado',
      render: (method) => {
        const statusClasses = {
          true: 'bg-green-100 text-green-800',
          false: 'bg-gray-100 text-gray-800',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[method.active]}`}>
            {method.active ? 'Ativo' : 'Inativo'}
          </span>
        );
      }
    },
    {
      id: 'actions',
      label: 'Ações',
      render: (method) => (
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleShippingClick(method);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
      )
    },
  ];
  
  // Handlers
  const handlePaymentClick = (payment) => {
    setSelectedPayment(payment);
    setIsPaymentModalOpen(true);
  };
  
  const handleShippingClick = (shipping) => {
    setSelectedShipping(shipping);
    setIsShippingModalOpen(true);
  };
  
  // Renderização do modal de configuração de pagamento
  const renderPaymentModal = () => {
    if (!selectedPayment) return null;
    
    return (
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title={`Configurar ${selectedPayment.name}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <ActionButton
              label="Cancelar"
              onClick={() => setIsPaymentModalOpen(false)}
              variant="secondary"
            />
            <ActionButton
              label="Guardar"
              onClick={() => {
                // Lógica para salvar configuração
                setIsPaymentModalOpen(false);
              }}
              icon="save"
            />
          </div>
        }
      >
        <div className="space-y-4">
          <FormGroup label="Nome" htmlFor="payment-name" required>
            <input
              type="text"
              id="payment-name"
              defaultValue={selectedPayment.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="Descrição" htmlFor="payment-description">
            <input
              type="text"
              id="payment-description"
              defaultValue={selectedPayment.description}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          {selectedPayment.name === 'PayPal' && (
            <>
              <FormGroup label="Cliente ID" htmlFor="paypal-client-id" required>
                <input
                  type="text"
                  id="paypal-client-id"
                  placeholder="Seu PayPal Client ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Segredo" htmlFor="paypal-secret" required>
                <input
                  type="password"
                  id="paypal-secret"
                  placeholder="Seu PayPal Secret"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Modo" htmlFor="paypal-mode" required>
                <select
                  id="paypal-mode"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="sandbox">Sandbox (Teste)</option>
                  <option value="live">Live (Produção)</option>
                </select>
              </FormGroup>
            </>
          )}
          
          {selectedPayment.name === 'Stripe' && (
            <>
              <FormGroup label="Chave Publicável" htmlFor="stripe-public-key" required>
                <input
                  type="text"
                  id="stripe-public-key"
                  placeholder="Sua Stripe Publishable Key"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Chave Secreta" htmlFor="stripe-secret-key" required>
                <input
                  type="password"
                  id="stripe-secret-key"
                  placeholder="Sua Stripe Secret Key"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Webhook Secret" htmlFor="stripe-webhook-secret">
                <input
                  type="password"
                  id="stripe-webhook-secret"
                  placeholder="Seu Stripe Webhook Secret"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
            </>
          )}
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="payment-active"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              defaultChecked={selectedPayment.active}
            />
            <label htmlFor="payment-active" className="ml-2 block text-sm text-gray-900">
              Método de pagamento ativo
            </label>
          </div>
        </div>
      </Modal>
    );
  };
  
  // Renderização do modal de configuração de envio
  const renderShippingModal = () => {
    if (!selectedShipping) return null;
    
    return (
      <Modal
        isOpen={isShippingModalOpen}
        onClose={() => setIsShippingModalOpen(false)}
        title={`Configurar ${selectedShipping.name}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <ActionButton
              label="Cancelar"
              onClick={() => setIsShippingModalOpen(false)}
              variant="secondary"
            />
            <ActionButton
              label="Guardar"
              onClick={() => {
                // Lógica para salvar configuração
                setIsShippingModalOpen(false);
              }}
              icon="save"
            />
          </div>
        }
      >
        <div className="space-y-4">
          <FormGroup label="Nome" htmlFor="shipping-name" required>
            <input
              type="text"
              id="shipping-name"
              defaultValue={selectedShipping.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="Descrição" htmlFor="shipping-description">
            <input
              type="text"
              id="shipping-description"
              defaultValue={selectedShipping.description}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="Preço" htmlFor="shipping-price" required>
            <input
              type="text"
              id="shipping-price"
              defaultValue={selectedShipping.price.replace('€', '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          {selectedShipping.name === 'GLS' && (
            <>
              <FormGroup label="API Key" htmlFor="gls-api-key">
                <input
                  type="text"
                  id="gls-api-key"
                  placeholder="Sua GLS API Key"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="API Secret" htmlFor="gls-api-secret">
                <input
                  type="password"
                  id="gls-api-secret"
                  placeholder="Seu GLS API Secret"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="URL da API" htmlFor="gls-api-url">
                <input
                  type="text"
                  id="gls-api-url"
                  placeholder="URL da API GLS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
            </>
          )}
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="shipping-active"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              defaultChecked={selectedShipping.active}
            />
            <label htmlFor="shipping-active" className="ml-2 block text-sm text-gray-900">
              Método de envio ativo
            </label>
          </div>
        </div>
      </Modal>
    );
  };
  
  // Renderização das abas
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Informações da Loja</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <FormGroup label="Nome da Loja" htmlFor="store-name" required>
                <input
                  type="text"
                  id="store-name"
                  defaultValue="Divino Encanto"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Email" htmlFor="store-email" required>
                <input
                  type="email"
                  id="store-email"
                  defaultValue="geral@divinoencanto.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Telefone" htmlFor="store-phone">
                <input
                  type="tel"
                  id="store-phone"
                  defaultValue="+351931307266"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="NIF" htmlFor="store-tax-id">
                <input
                  type="text"
                  id="store-tax-id"
                  defaultValue="517772221"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Morada" htmlFor="store-address" className="md:col-span-2">
                <input
                  type="text"
                  id="store-address"
                  placeholder="Morada da loja"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Código Postal" htmlFor="store-postal-code">
                <input
                  type="text"
                  id="store-postal-code"
                  placeholder="Código postal"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Cidade" htmlFor="store-city">
                <input
                  type="text"
                  id="store-city"
                  placeholder="Cidade"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="País" htmlFor="store-country" className="md:col-span-2">
                <select
                  id="store-country"
                  defaultValue="PT"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="PT">Portugal</option>
                  <option value="ES">Espanha</option>
                  <option value="FR">França</option>
                  <option value="DE">Alemanha</option>
                  <option value="IT">Itália</option>
                </select>
              </FormGroup>
            </div>
            
            <h2 className="text-lg font-medium text-gray-900 mb-4">Configurações Gerais</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <FormGroup label="Moeda" htmlFor="store-currency">
                <select
                  id="store-currency"
                  defaultValue="EUR"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dólar Americano ($)</option>
                  <option value="GBP">Libra Esterlina (£)</option>
                </select>
              </FormGroup>
              
              <FormGroup label="Idioma Padrão" htmlFor="store-language">
                <select
                  id="store-language"
                  defaultValue="pt"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pt">Português</option>
                  <option value="en">Inglês</option>
                  <option value="es">Espanhol</option>
                </select>
              </FormGroup>
              
              <FormGroup label="Taxa de IVA Padrão (%)" htmlFor="store-tax-rate">
                <input
                  type="number"
                  id="store-tax-rate"
                  defaultValue="23"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Produtos por Página" htmlFor="store-products-per-page">
                <input
                  type="number"
                  id="store-products-per-page"
                  defaultValue="12"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
            </div>
            
            <div className="flex justify-end">
              <ActionButton
                label="Guardar Alterações"
                onClick={() => {
                  // Lógica para salvar configurações
                }}
                icon="save"
              />
            </div>
          </div>
        );
      
      case 'payment':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Métodos de Pagamento</h2>
            
            <DataTable 
              columns={paymentColumns} 
              data={paymentMethods}
              onRowClick={handlePaymentClick}
            />
            
            {renderPaymentModal()}
          </div>
        );
      
      case 'shipping':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Métodos de Envio</h2>
            
            <DataTable 
              columns={shippingColumns} 
              data={shippingMethods}
              onRowClick={handleShippingClick}
            />
            
            {renderShippingModal()}
          </div>
        );
      
      case 'email':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Configurações de Email</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <FormGroup label="Servidor SMTP" htmlFor="smtp-host" required>
                <input
                  type="text"
                  id="smtp-host"
                  placeholder="smtp.exemplo.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Porta SMTP" htmlFor="smtp-port" required>
                <input
                  type="number"
                  id="smtp-port"
                  placeholder="587"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Email" htmlFor="smtp-email" required>
                <input
                  type="email"
                  id="smtp-email"
                  placeholder="geral@divinoencanto.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Password" htmlFor="smtp-password" required>
                <input
                  type="password"
                  id="smtp-password"
                  placeholder="********"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Nome do Remetente" htmlFor="smtp-from-name" required>
                <input
                  type="text"
                  id="smtp-from-name"
                  placeholder="Divino Encanto"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <FormGroup label="Email do Remetente" htmlFor="smtp-from-email" required>
                <input
                  type="email"
                  id="smtp-from-email"
                  placeholder="geral@divinoencanto.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <div className="md:col-span-2">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="smtp-secure"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="smtp-secure" className="ml-2 block text-sm text-gray-900">
                    Usar conexão segura (SSL/TLS)
                  </label>
                </div>
              </div>
            </div>
            
            <h2 className="text-lg font-medium text-gray-900 mb-4">Testar Configuração</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <FormGroup label="Email de Teste" htmlFor="test-email" required>
                <input
                  type="email"
                  id="test-email"
                  placeholder="seu@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </FormGroup>
              
              <div className="flex items-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Enviar Email de Teste
                </button>
              </div>
            </div>
            
            <div className="flex justify-end">
              <ActionButton
                label="Guardar Alterações"
                onClick={() => {
                  // Lógica para salvar configurações
                }}
                icon="save"
              />
            </div>
          </div>
        );
      
      case 'integrations':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Integrações com Marketplaces</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                      <i className="fab fa-amazon text-2xl text-gray-700"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Amazon</h3>
                      <p className="text-sm text-gray-600">Integre sua loja com a Amazon</p>
                    </div>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Não configurado
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormGroup label="API Key" htmlFor="amazon-api-key">
                    <input
                      type="text"
                      id="amazon-api-key"
                      placeholder="Sua Amazon API Key"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormGroup>
                  
                  <FormGroup label="API Secret" htmlFor="amazon-api-secret">
                    <input
                      type="password"
                      id="amazon-api-secret"
                      placeholder="Seu Amazon API Secret"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormGroup>
                  
                  <FormGroup label="Seller ID" htmlFor="amazon-seller-id">
                    <input
                      type="text"
                      id="amazon-seller-id"
                      placeholder="Seu Amazon Seller ID"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormGroup>
                  
                  <FormGroup label="Marketplace" htmlFor="amazon-marketplace">
                    <select
                      id="amazon-marketplace"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione um marketplace</option>
                      <option value="amazon.es">Amazon Espanha</option>
                      <option value="amazon.fr">Amazon França</option>
                      <option value="amazon.de">Amazon Alemanha</option>
                      <option value="amazon.it">Amazon Itália</option>
                      <option value="amazon.co.uk">Amazon Reino Unido</option>
                    </select>
                  </FormGroup>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Salvar Configuração
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                      <span className="text-lg font-bold text-gray-700">W</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">Worten</h3>
                      <p className="text-sm text-gray-600">Integre sua loja com a Worten</p>
                    </div>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Não configurado
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormGroup label="API Key" htmlFor="worten-api-key">
                    <input
                      type="text"
                      id="worten-api-key"
                      placeholder="Sua Worten API Key"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormGroup>
                  
                  <FormGroup label="API Secret" htmlFor="worten-api-secret">
                    <input
                      type="password"
                      id="worten-api-secret"
                      placeholder="Seu Worten API Secret"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormGroup>
                  
                  <FormGroup label="Seller ID" htmlFor="worten-seller-id">
                    <input
                      type="text"
                      id="worten-seller-id"
                      placeholder="Seu Worten Seller ID"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormGroup>
                </div>
                
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Salvar Configuração
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 flex-shrink-0">
        <AdminSidebar activeLink="settings" />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <AdminHeader 
            title="Configurações" 
            subtitle="Gerencie as configurações da sua loja"
          />
          
          <div className="mt-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`${
                    activeTab === 'general'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Geral
                </button>
                
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`${
                    activeTab === 'payment'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Pagamentos
                </button>
                
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`${
                    activeTab === 'shipping'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Envios
                </button>
                
                <button
                  onClick={() => setActiveTab('email')}
                  className={`${
                    activeTab === 'email'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Email
                </button>
                
                <button
                  onClick={() => setActiveTab('integrations')}
                  className={`${
                    activeTab === 'integrations'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Integrações
                </button>
              </nav>
            </div>
            
            <div className="mt-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
