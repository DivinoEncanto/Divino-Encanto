import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable from '../../components/admin/DataTable';
import ActionButton from '../../components/admin/ActionButton';
import Modal from '../../components/admin/Modal';
import FormGroup from '../../components/admin/FormGroup';
import AdminPagination from '../../components/admin/AdminPagination';

const AdminCustomers: React.FC = () => {
  const { t } = useTranslation('common');
  
  // Estados
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  // Dados de exemplo para demonstração
  const customers = [
    { id: '1', name: 'João Silva', email: 'joao.silva@exemplo.com', phone: '+351 912 345 678', orders: 5, totalSpent: '€349.95', lastOrder: '15/04/2025' },
    { id: '2', name: 'Maria Santos', email: 'maria.santos@exemplo.com', phone: '+351 923 456 789', orders: 3, totalSpent: '€189.50', lastOrder: '14/04/2025' },
    { id: '3', name: 'Pedro Costa', email: 'pedro.costa@exemplo.com', phone: '+351 934 567 890', orders: 1, totalSpent: '€45.99', lastOrder: '13/04/2025' },
    { id: '4', name: 'Ana Oliveira', email: 'ana.oliveira@exemplo.com', phone: '+351 945 678 901', orders: 7, totalSpent: '€529.90', lastOrder: '12/04/2025' },
    { id: '5', name: 'Carlos Ferreira', email: 'carlos.ferreira@exemplo.com', phone: '+351 956 789 012', orders: 2, totalSpent: '€97.45', lastOrder: '11/04/2025' },
    { id: '6', name: 'Sofia Martins', email: 'sofia.martins@exemplo.com', phone: '+351 967 890 123', orders: 4, totalSpent: '€259.99', lastOrder: '10/04/2025' },
    { id: '7', name: 'Miguel Rodrigues', email: 'miguel.rodrigues@exemplo.com', phone: '+351 978 901 234', orders: 6, totalSpent: '€419.95', lastOrder: '09/04/2025' },
    { id: '8', name: 'Beatriz Almeida', email: 'beatriz.almeida@exemplo.com', phone: '+351 989 012 345', orders: 2, totalSpent: '€89.90', lastOrder: '08/04/2025' },
    { id: '9', name: 'Ricardo Sousa', email: 'ricardo.sousa@exemplo.com', phone: '+351 990 123 456', orders: 3, totalSpent: '€159.85', lastOrder: '07/04/2025' },
    { id: '10', name: 'Inês Pereira', email: 'ines.pereira@exemplo.com', phone: '+351 901 234 567', orders: 1, totalSpent: '€39.99', lastOrder: '06/04/2025' },
  ];
  
  // Configuração da tabela
  const columns = [
    { id: 'name', label: 'Nome' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Telefone' },
    { 
      id: 'orders', 
      label: 'Encomendas',
      render: (customer) => (
        <span className="font-medium">{customer.orders}</span>
      )
    },
    { id: 'totalSpent', label: 'Total Gasto' },
    { id: 'lastOrder', label: 'Última Encomenda' },
    {
      id: 'actions',
      label: 'Ações',
      render: (customer) => (
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleViewClick(customer);
            }}
            className="text-blue-600 hover:text-blue-800"
            title="Ver detalhes"
          >
            <i className="fas fa-eye"></i>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(customer);
            }}
            className="text-yellow-600 hover:text-yellow-800"
            title="Editar cliente"
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
      )
    },
  ];
  
  // Handlers
  const handleViewClick = (customer) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };
  
  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setIsEditModalOpen(true);
  };
  
  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // Renderização do modal de visualização
  const renderViewModal = () => {
    if (!selectedCustomer) return null;
    
    // Dados de exemplo para pedidos do cliente
    const customerOrders = [
      { id: '1001', date: '15/04/2025', total: '€79.97', status: 'Entregue' },
      { id: '1002', date: '14/03/2025', total: '€129.50', status: 'Entregue' },
      { id: '1003', date: '13/02/2025', total: '€45.99', status: 'Entregue' },
      { id: '1004', date: '12/01/2025', total: '€94.49', status: 'Entregue' },
    ];
    
    // Dados de exemplo para endereços do cliente
    const customerAddresses = [
      { id: 1, name: 'Casa', street: 'Rua Exemplo, 123', city: 'Lisboa', postalCode: '1000-000', country: 'Portugal', isDefault: true },
      { id: 2, name: 'Trabalho', street: 'Avenida Exemplo, 456', city: 'Porto', postalCode: '4000-000', country: 'Portugal', isDefault: false },
    ];
    
    return (
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Cliente: ${selectedCustomer.name}`}
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <ActionButton
              label="Fechar"
              onClick={() => setIsViewModalOpen(false)}
              variant="secondary"
            />
            <ActionButton
              label="Editar"
              onClick={() => {
                setIsViewModalOpen(false);
                setIsEditModalOpen(true);
              }}
              icon="edit"
            />
          </div>
        }
      >
        <div className="space-y-6">
          {/* Informações gerais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Informações do Cliente</h3>
              <p><strong>Nome:</strong> {selectedCustomer.name}</p>
              <p><strong>Email:</strong> {selectedCustomer.email}</p>
              <p><strong>Telefone:</strong> {selectedCustomer.phone}</p>
              <p><strong>Data de Registo:</strong> 01/01/2025</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Estatísticas</h3>
              <p><strong>Total de Encomendas:</strong> {selectedCustomer.orders}</p>
              <p><strong>Total Gasto:</strong> {selectedCustomer.totalSpent}</p>
              <p><strong>Última Encomenda:</strong> {selectedCustomer.lastOrder}</p>
              <p><strong>Média por Encomenda:</strong> €{(parseFloat(selectedCustomer.totalSpent.replace('€', '')) / selectedCustomer.orders).toFixed(2)}</p>
            </div>
          </div>
          
          {/* Endereços */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Endereços</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customerAddresses.map((address) => (
                <div key={address.id} className={`p-4 border rounded-md ${address.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{address.name}</h4>
                    {address.isDefault && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Padrão
                      </span>
                    )}
                  </div>
                  <p>{address.street}</p>
                  <p>{address.postalCode} {address.city}</p>
                  <p>{address.country}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pedidos recentes */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Encomendas Recentes</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nº Encomenda
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customerOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Notas */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Notas</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-600">Cliente fiel desde o início da loja. Prefere entregas rápidas e já recomendou a loja para amigos.</p>
            </div>
          </div>
        </div>
      </Modal>
    );
  };
  
  // Renderização do modal de edição
  const renderEditModal = () => {
    if (!selectedCustomer) return null;
    
    return (
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Editar Cliente: ${selectedCustomer.name}`}
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <ActionButton
              label="Cancelar"
              onClick={() => setIsEditModalOpen(false)}
              variant="secondary"
            />
            <ActionButton
              label="Guardar"
              onClick={() => {
                // Lógica para salvar cliente
                setIsEditModalOpen(false);
              }}
              icon="save"
            />
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Nome" htmlFor="edit-name" required>
            <input
              type="text"
              id="edit-name"
              defaultValue={selectedCustomer.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="Email" htmlFor="edit-email" required>
            <input
              type="email"
              id="edit-email"
              defaultValue={selectedCustomer.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="Telefone" htmlFor="edit-phone">
            <input
              type="tel"
              id="edit-phone"
              defaultValue={selectedCustomer.phone}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="NIF" htmlFor="edit-tax-id">
            <input
              type="text"
              id="edit-tax-id"
              placeholder="NIF do cliente"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="Data de Nascimento" htmlFor="edit-birthdate" className="md:col-span-2">
            <input
              type="date"
              id="edit-birthdate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="Notas" htmlFor="edit-notes" className="md:col-span-2">
            <textarea
              id="edit-notes"
              rows={4}
              defaultValue="Cliente fiel desde o início da loja. Prefere entregas rápidas e já recomendou a loja para amigos."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </FormGroup>
          
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Endereços</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-md border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">Casa (Padrão)</h4>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <p>Rua Exemplo, 123</p>
                <p>1000-000 Lisboa</p>
                <p>Portugal</p>
              </div>
              
              <div className="p-4 border rounded-md border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">Trabalho</h4>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <p>Avenida Exemplo, 456</p>
                <p>4000-000 Porto</p>
                <p>Portugal</p>
              </div>
              
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i className="fas fa-plus mr-2"></i>
                Adicionar Endereço
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 flex-shrink-0">
        <AdminSidebar activeLink="customers" />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <AdminHeader 
              title="Clientes" 
              subtitle="Gerencie os clientes da sua loja"
            />
            
            <div>
              <ActionButton
                label="Adicionar Cliente"
                onClick={() => {
                  // Lógica para adicionar cliente
                }}
                icon="user-plus"
              />
            </div>
          </div>
          
          {/* Filtros */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Pesquisar
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Nome, email ou telefone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="order-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Encomendas
                </label>
                <select
                  id="order-filter"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos os clientes</option>
                  <option value="with_orders">Com encomendas</option>
                  <option value="without_orders">Sem encomendas</option>
                  <option value="multiple_orders">Múltiplas encomendas</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  type="button"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Filtrar
                </button>
              </div>
            </div>
          </div>
          
          {/* Tabela de clientes */}
          <DataTable 
            columns={columns} 
            data={customers}
            onRowClick={handleRowClick}
          />
          
          {/* Paginação */}
          <AdminPagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={handlePageChange}
            className="mt-6"
          />
          
          {/* Modais */}
          {renderViewModal()}
          {renderEditModal()}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
