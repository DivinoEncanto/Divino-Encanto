import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable from '../../components/admin/DataTable';
import ActionButton from '../../components/admin/ActionButton';
import Modal from '../../components/admin/Modal';
import FormGroup from '../../components/admin/FormGroup';
import AdminPagination from '../../components/admin/AdminPagination';

const AdminProducts: React.FC = () => {
  const { t } = useTranslation('common');
  
  // Estados
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Dados de exemplo para demonstração
  const products = [
    { id: '1', name: 'Produto 1', category: 'Categoria 1', price: '€29.99', stock: 15, status: 'Ativo' },
    { id: '2', name: 'Produto 2', category: 'Categoria 2', price: '€39.99', stock: 8, status: 'Ativo' },
    { id: '3', name: 'Produto 3', category: 'Categoria 1', price: '€19.99', stock: 0, status: 'Esgotado' },
    { id: '4', name: 'Produto 4', category: 'Categoria 3', price: '€49.99', stock: 12, status: 'Ativo' },
    { id: '5', name: 'Produto 5', category: 'Categoria 2', price: '€59.99', stock: 5, status: 'Ativo' },
    { id: '6', name: 'Produto 6', category: 'Categoria 1', price: '€24.99', stock: 20, status: 'Ativo' },
    { id: '7', name: 'Produto 7', category: 'Categoria 3', price: '€34.99', stock: 3, status: 'Ativo' },
    { id: '8', name: 'Produto 8', category: 'Categoria 2', price: '€44.99', stock: 0, status: 'Esgotado' },
    { id: '9', name: 'Produto 9', category: 'Categoria 1', price: '€54.99', stock: 7, status: 'Ativo' },
    { id: '10', name: 'Produto 10', category: 'Categoria 3', price: '€64.99', stock: 9, status: 'Ativo' },
  ];
  
  // Configuração da tabela
  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Nome' },
    { id: 'category', label: 'Categoria' },
    { id: 'price', label: 'Preço' },
    { 
      id: 'stock', 
      label: 'Stock',
      render: (product) => (
        <span className={product.stock === 0 ? 'text-red-600 font-medium' : ''}>
          {product.stock}
        </span>
      )
    },
    { 
      id: 'status', 
      label: 'Estado',
      render: (product) => {
        const statusClasses = {
          'Ativo': 'bg-green-100 text-green-800',
          'Esgotado': 'bg-red-100 text-red-800',
          'Inativo': 'bg-gray-100 text-gray-800',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[product.status]}`}>
            {product.status}
          </span>
        );
      }
    },
    {
      id: 'actions',
      label: 'Ações',
      render: (product) => (
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(product);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(product);
            }}
            className="text-red-600 hover:text-red-800"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      )
    },
  ];
  
  // Handlers
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };
  
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };
  
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };
  
  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  // Renderização do modal de adição
  const renderAddModal = () => (
    <Modal
      isOpen={isAddModalOpen}
      onClose={() => setIsAddModalOpen(false)}
      title="Adicionar Produto"
      size="lg"
      footer={
        <div className="flex justify-end space-x-3">
          <ActionButton
            label="Cancelar"
            onClick={() => setIsAddModalOpen(false)}
            variant="secondary"
          />
          <ActionButton
            label="Adicionar"
            onClick={() => {
              // Lógica para adicionar produto
              setIsAddModalOpen(false);
            }}
            icon="plus"
          />
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormGroup label="Nome" htmlFor="name" required>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormGroup>
        
        <FormGroup label="Categoria" htmlFor="category" required>
          <select
            id="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma categoria</option>
            <option value="1">Categoria 1</option>
            <option value="2">Categoria 2</option>
            <option value="3">Categoria 3</option>
          </select>
        </FormGroup>
        
        <FormGroup label="Preço" htmlFor="price" required>
          <input
            type="number"
            id="price"
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormGroup>
        
        <FormGroup label="Stock" htmlFor="stock" required>
          <input
            type="number"
            id="stock"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormGroup>
        
        <FormGroup label="Referência" htmlFor="reference" className="md:col-span-2">
          <input
            type="text"
            id="reference"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormGroup>
        
        <FormGroup label="Descrição" htmlFor="description" className="md:col-span-2">
          <textarea
            id="description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </FormGroup>
        
        <FormGroup label="Imagens" htmlFor="images" className="md:col-span-2">
          <input
            type="file"
            id="images"
            multiple
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormGroup>
      </div>
    </Modal>
  );
  
  // Renderização do modal de edição
  const renderEditModal = () => {
    if (!selectedProduct) return null;
    
    return (
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Editar Produto: ${selectedProduct.name}`}
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
                // Lógica para salvar produto
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
              defaultValue={selectedProduct.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="Categoria" htmlFor="edit-category" required>
            <select
              id="edit-category"
              defaultValue={selectedProduct.category}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Categoria 1">Categoria 1</option>
              <option value="Categoria 2">Categoria 2</option>
              <option value="Categoria 3">Categoria 3</option>
            </select>
          </FormGroup>
          
          <FormGroup label="Preço" htmlFor="edit-price" required>
            <input
              type="text"
              id="edit-price"
              defaultValue={selectedProduct.price.replace('€', '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="Stock" htmlFor="edit-stock" required>
            <input
              type="number"
              id="edit-stock"
              defaultValue={selectedProduct.stock}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="Estado" htmlFor="edit-status">
            <select
              id="edit-status"
              defaultValue={selectedProduct.status}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </FormGroup>
          
          <FormGroup label="Referência" htmlFor="edit-reference">
            <input
              type="text"
              id="edit-reference"
              defaultValue={selectedProduct.id}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="Descrição" htmlFor="edit-description" className="md:col-span-2">
            <textarea
              id="edit-description"
              rows={4}
              defaultValue="Descrição do produto..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </FormGroup>
          
          <FormGroup label="Imagens" htmlFor="edit-images" className="md:col-span-2">
            <div className="mb-2">
              <p className="text-sm text-gray-600 mb-2">Imagens atuais:</p>
              <div className="flex space-x-2">
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <i className="fas fa-image text-gray-400"></i>
                </div>
              </div>
            </div>
            <input
              type="file"
              id="edit-images"
              multiple
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
        </div>
      </Modal>
    );
  };
  
  // Renderização do modal de exclusão
  const renderDeleteModal = () => {
    if (!selectedProduct) return null;
    
    return (
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Exclusão"
        size="sm"
        footer={
          <div className="flex justify-end space-x-3">
            <ActionButton
              label="Cancelar"
              onClick={() => setIsDeleteModalOpen(false)}
              variant="secondary"
            />
            <ActionButton
              label="Excluir"
              onClick={() => {
                // Lógica para excluir produto
                setIsDeleteModalOpen(false);
              }}
              variant="danger"
              icon="trash"
            />
          </div>
        }
      >
        <p>Tem certeza que deseja excluir o produto <strong>{selectedProduct.name}</strong>?</p>
        <p className="text-sm text-gray-600 mt-2">Esta ação não pode ser desfeita.</p>
      </Modal>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 flex-shrink-0">
        <AdminSidebar activeLink="products" />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <AdminHeader 
              title="Produtos" 
              subtitle="Gerencie os produtos da sua loja"
            />
            
            <div className="flex space-x-3">
              <ActionButton
                label="Importar Excel"
                onClick={() => {
                  // Lógica para importar produtos
                }}
                icon="file-excel"
                variant="success"
              />
              
              <ActionButton
                label="Adicionar Produto"
                onClick={handleAddClick}
                icon="plus"
              />
            </div>
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
                  placeholder="Nome ou referência"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  id="category-filter"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas as categorias</option>
                  <option value="1">Categoria 1</option>
                  <option value="2">Categoria 2</option>
                  <option value="3">Categoria 3</option>
                </select>
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
                  <option value="active">Ativo</option>
                  <option value="outofstock">Esgotado</option>
                  <option value="inactive">Inativo</option>
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
          
          {/* Tabela de produtos */}
          <DataTable 
            columns={columns} 
            data={products}
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
          {renderAddModal()}
          {renderEditModal()}
          {renderDeleteModal()}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
