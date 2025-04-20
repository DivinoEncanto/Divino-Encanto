import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable from '../../components/admin/DataTable';
import ActionButton from '../../components/admin/ActionButton';
import Modal from '../../components/admin/Modal';
import FormGroup from '../../components/admin/FormGroup';
import AdminPagination from '../../components/admin/AdminPagination';

const AdminOrders: React.FC = () => {
  const { t } = useTranslation('common');
  
  // Estados
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Dados de exemplo para demonstração
  const orders = [
    { id: '1001', customer: 'João Silva', date: '15/04/2025', total: '€79.97', status: 'Entregue', items: 3, payment: 'PayPal' },
    { id: '1002', customer: 'Maria Santos', date: '14/04/2025', total: '€129.50', status: 'Em processamento', items: 2, payment: 'Cartão de Crédito' },
    { id: '1003', customer: 'Pedro Costa', date: '13/04/2025', total: '€45.99', status: 'Enviado', items: 1, payment: 'PayPal' },
    { id: '1004', customer: 'Ana Oliveira', date: '12/04/2025', total: '€199.90', status: 'Pago', items: 4, payment: 'Transferência Bancária' },
    { id: '1005', customer: 'Carlos Ferreira', date: '11/04/2025', total: '€67.45', status: 'Entregue', items: 2, payment: 'PayPal' },
    { id: '1006', customer: 'Sofia Martins', date: '10/04/2025', total: '€89.99', status: 'Cancelado', items: 1, payment: 'Cartão de Crédito' },
    { id: '1007', customer: 'Miguel Rodrigues', date: '09/04/2025', total: '€149.95', status: 'Enviado', items: 3, payment: 'PayPal' },
    { id: '1008', customer: 'Beatriz Almeida', date: '08/04/2025', total: '€59.90', status: 'Pago', items: 2, payment: 'Cartão de Crédito' },
    { id: '1009', customer: 'Ricardo Sousa', date: '07/04/2025', total: '€119.85', status: 'Em processamento', items: 3, payment: 'PayPal' },
    { id: '1010', customer: 'Inês Pereira', date: '06/04/2025', total: '€39.99', status: 'Entregue', items: 1, payment: 'Transferência Bancária' },
  ];
  
  // Configuração da tabela
  const columns = [
    { id: 'id', label: 'Nº Encomenda' },
    { id: 'customer', label: 'Cliente' },
    { id: 'date', label: 'Data' },
    { id: 'total', label: 'Total' },
    { 
      id: 'status', 
      label: 'Estado',
      render: (order) => {
        const statusClasses = {
          'Entregue': 'bg-green-100 text-green-800',
          'Enviado': 'bg-blue-100 text-blue-800',
          'Em processamento': 'bg-yellow-100 text-yellow-800',
          'Pago': 'bg-purple-100 text-purple-800',
          'Pendente': 'bg-gray-100 text-gray-800',
          'Cancelado': 'bg-red-100 text-red-800',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[order.status] || 'bg-gray-100 text-gray-800'}`}>
            {order.status}
          </span>
        );
      }
    },
    {
      id: 'actions',
      label: 'Ações',
      render: (order) => (
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleViewClick(order);
            }}
            className="text-blue-600 hover:text-blue-800"
            title="Ver detalhes"
          >
            <i className="fas fa-eye"></i>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleStatusClick(order);
            }}
            className="text-yellow-600 hover:text-yellow-800"
            title="Atualizar estado"
          >
            <i className="fas fa-exchange-alt"></i>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleInvoiceClick(order);
            }}
            className="text-green-600 hover:text-green-800"
            title="Fatura"
          >
            <i className="fas fa-file-invoice"></i>
          </button>
        </div>
      )
    },
  ];
  
  // Handlers
  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };
  
  const handleStatusClick = (order) => {
    setSelectedOrder(order);
    setIsStatusModalOpen(true);
  };
  
  const handleInvoiceClick = (order) => {
    setSelectedOrder(order);
    setIsInvoiceModalOpen(true);
  };
  
  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // Renderização do modal de visualização
  const renderViewModal = () => {
    if (!selectedOrder) return null;
    
    // Dados de exemplo para itens do pedido
    const orderItems = [
      { id: 1, name: 'Produto A', quantity: 1, price: '€29.99', total: '€29.99' },
      { id: 2, name: 'Produto B', quantity: 2, price: '€19.99', total: '€39.98' },
    ];
    
    return (
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Encomenda #${selectedOrder.id}`}
        size="lg"
        footer={
          <div className="flex justify-end space-x-3">
            <ActionButton
              label="Fechar"
              onClick={() => setIsViewModalOpen(false)}
              variant="secondary"
            />
            <ActionButton
              label="Imprimir"
              onClick={() => {
                // Lógica para imprimir
                window.print();
              }}
              icon="print"
            />
          </div>
        }
      >
        <div className="space-y-6">
          {/* Informações gerais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Informações da Encomenda</h3>
              <p><strong>Nº Encomenda:</strong> {selectedOrder.id}</p>
              <p><strong>Data:</strong> {selectedOrder.date}</p>
              <p><strong>Estado:</strong> {selectedOrder.status}</p>
              <p><strong>Método de Pagamento:</strong> {selectedOrder.payment}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Informações do Cliente</h3>
              <p><strong>Nome:</strong> {selectedOrder.customer}</p>
              <p><strong>Email:</strong> cliente@exemplo.com</p>
              <p><strong>Telefone:</strong> +351 912 345 678</p>
            </div>
          </div>
          
          {/* Endereço de entrega */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Endereço de Entrega</h3>
            <p>Rua Exemplo, 123</p>
            <p>1000-000 Lisboa</p>
            <p>Portugal</p>
          </div>
          
          {/* Itens do pedido */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Itens da Encomenda</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantidade
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orderItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Resumo do pedido */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Subtotal:</span>
              <span className="text-sm font-medium">€69.97</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Envio:</span>
              <span className="text-sm font-medium">€10.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">IVA (23%):</span>
              <span className="text-sm font-medium">€18.39</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{selectedOrder.total}</span>
            </div>
          </div>
          
          {/* Histórico de estados */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Histórico de Estados</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Encomenda recebida</p>
                  <p className="text-sm text-gray-500">06/04/2025 10:23</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Pagamento confirmado</p>
                  <p className="text-sm text-gray-500">06/04/2025 10:25</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Em processamento</p>
                  <p className="text-sm text-gray-500">07/04/2025 09:15</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Enviado</p>
                  <p className="text-sm text-gray-500">08/04/2025 14:30</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Entregue</p>
                  <p className="text-sm text-gray-500">10/04/2025 11:45</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };
  
  // Renderização do modal de atualização de estado
  const renderStatusModal = () => {
    if (!selectedOrder) return null;
    
    return (
      <Modal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        title={`Atualizar Estado da Encomenda #${selectedOrder.id}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <ActionButton
              label="Cancelar"
              onClick={() => setIsStatusModalOpen(false)}
              variant="secondary"
            />
            <ActionButton
              label="Atualizar"
              onClick={() => {
                // Lógica para atualizar estado
                setIsStatusModalOpen(false);
              }}
              icon="save"
            />
          </div>
        }
      >
        <div className="space-y-4">
          <FormGroup label="Estado Atual" htmlFor="current-status">
            <input
              type="text"
              id="current-status"
              value={selectedOrder.status}
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </FormGroup>
          
          <FormGroup label="Novo Estado" htmlFor="new-status" required>
            <select
              id="new-status"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione um estado</option>
              <option value="pending">Pendente</option>
              <option value="paid">Pago</option>
              <option value="processing">Em processamento</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregue</option>
              <option value="canceled">Cancelado</option>
            </select>
          </FormGroup>
          
          <FormGroup label="Número de Rastreio" htmlFor="tracking-number">
            <input
              type="text"
              id="tracking-number"
              placeholder="Opcional"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="Transportadora" htmlFor="carrier">
            <select
              id="carrier"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione uma transportadora</option>
              <option value="gls">GLS</option>
              <option value="ctt">CTT</option>
              <option value="dhl">DHL</option>
              <option value="ups">UPS</option>
              <option value="fedex">FedEx</option>
            </select>
          </FormGroup>
          
          <FormGroup label="Observações" htmlFor="notes">
            <textarea
              id="notes"
              rows={3}
              placeholder="Observações adicionais (opcional)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </FormGroup>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="notify-customer"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="notify-customer" className="ml-2 block text-sm text-gray-900">
              Notificar cliente por email
            </label>
          </div>
        </div>
      </Modal>
    );
  };
  
  // Renderização do modal de fatura
  const renderInvoiceModal = () => {
    if (!selectedOrder) return null;
    
    return (
      <Modal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        title={`Fatura da Encomenda #${selectedOrder.id}`}
        size="md"
        footer={
          <div className="flex justify-end space-x-3">
            <ActionButton
              label="Cancelar"
              onClick={() => setIsInvoiceModalOpen(false)}
              variant="secondary"
            />
            <ActionButton
              label="Gerar Fatura"
              onClick={() => {
                // Lógica para gerar fatura
                setIsInvoiceModalOpen(false);
              }}
              icon="file-invoice"
              variant="success"
            />
          </div>
        }
      >
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-600 mb-2">Estado da Fatura:</p>
            <p className="font-medium">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Pendente
              </span>
            </p>
          </div>
          
          <FormGroup label="Número da Fatura" htmlFor="invoice-number">
            <input
              type="text"
              id="invoice-number"
              placeholder="Será gerado automaticamente"
              disabled
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
            />
          </FormGroup>
          
          <FormGroup label="Data da Fatura" htmlFor="invoice-date">
            <input
              type="date"
              id="invoice-date"
              defaultValue={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="NIF do Cliente" htmlFor="customer-tax-id">
            <input
              type="text"
              id="customer-tax-id"
              placeholder="NIF do cliente"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Ações:</p>
            <div className="flex space-x-2">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i className="fas fa-download mr-2"></i>
                Download
              </button>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i className="fas fa-envelope mr-2"></i>
                Enviar por Email
              </button>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i className="fas fa-print mr-2"></i>
                Imprimir
              </button>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Upload de Fatura Manual:</p>
            <input
              type="file"
              id="invoice-upload"
              accept=".pdf,.jpg,.jpeg,.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Formatos aceites: PDF, JPG, JPEG, PNG. Tamanho máximo: 5MB.
            </p>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 flex-shrink-0">
        <AdminSidebar activeLink="orders" />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <AdminHeader 
              title="Encomendas" 
              subtitle="Gerencie as encomendas da sua loja"
            />
          </div>
          
          {/* Filtros */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Pesquisar
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Nº encomenda ou cliente"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  id="status-filter"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos os estados</option>
                  <option value="pending">Pendente</option>
                  <option value="paid">Pago</option>
                  <option value="processing">Em processamento</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregue</option>
                  <option value="canceled">Cancelado</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="date-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Data
                </label>
                <select
                  id="date-filter"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas as datas</option>
                  <option value="today">Hoje</option>
                  <option value="yesterday">Ontem</option>
                  <option value="last7days">Últimos 7 dias</option>
                  <option value="last30days">Últimos 30 dias</option>
                  <option value="thismonth">Este mês</option>
                  <option value="lastmonth">Mês passado</option>
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
          
          {/* Tabela de encomendas */}
          <DataTable 
            columns={columns} 
            data={orders}
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
          {renderStatusModal()}
          {renderInvoiceModal()}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
