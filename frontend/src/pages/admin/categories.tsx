import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import DataTable from '../../components/admin/DataTable';
import ActionButton from '../../components/admin/ActionButton';
import Modal from '../../components/admin/Modal';
import FormGroup from '../../components/admin/FormGroup';
import AdminPagination from '../../components/admin/AdminPagination';

const AdminCategories: React.FC = () => {
  const { t } = useTranslation('common');
  
  // Estados
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Dados de exemplo para demonstração
  const categories = [
    { id: '1', name: 'Categoria 1', parent: '-', products: 15, status: 'Ativo' },
    { id: '2', name: 'Categoria 2', parent: '-', products: 8, status: 'Ativo' },
    { id: '3', name: 'Subcategoria 1.1', parent: 'Categoria 1', products: 5, status: 'Ativo' },
    { id: '4', name: 'Subcategoria 1.2', parent: 'Categoria 1', products: 10, status: 'Ativo' },
    { id: '5', name: 'Subcategoria 2.1', parent: 'Categoria 2', products: 3, status: 'Ativo' },
    { id: '6', name: 'Subcategoria 2.2', parent: 'Categoria 2', products: 5, status: 'Ativo' },
    { id: '7', name: 'Categoria 3', parent: '-', products: 0, status: 'Inativo' },
    { id: '8', name: 'Categoria 4', parent: '-', products: 12, status: 'Ativo' },
    { id: '9', name: 'Subcategoria 4.1', parent: 'Categoria 4', products: 7, status: 'Ativo' },
    { id: '10', name: 'Subcategoria 4.2', parent: 'Categoria 4', products: 5, status: 'Ativo' },
  ];
  
  // Configuração da tabela
  const columns = [
    { id: 'name', label: 'Nome' },
    { id: 'parent', label: 'Categoria Pai' },
    { 
      id: 'products', 
      label: 'Produtos',
      render: (category) => (
        <span className="font-medium">{category.products}</span>
      )
    },
    { 
      id: 'status', 
      label: 'Estado',
      render: (category) => {
        const statusClasses = {
          'Ativo': 'bg-green-100 text-green-800',
          'Inativo': 'bg-gray-100 text-gray-800',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[category.status]}`}>
            {category.status}
          </span>
        );
      }
    },
    {
      id: 'actions',
      label: 'Ações',
      render: (category) => (
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(category);
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            <i className="fas fa-edit"></i>
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(category);
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
  
  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };
  
  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };
  
  const handleRowClick = (category) => {
    setSelectedCategory(category);
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
      title="Adicionar Categoria"
      size="md"
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
              // Lógica para adicionar categoria
              setIsAddModalOpen(false);
            }}
            icon="plus"
          />
        </div>
      }
    >
      <div className="space-y-4">
        <FormGroup label="Nome" htmlFor="name" required>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormGroup>
        
        <FormGroup label="Categoria Pai" htmlFor="parent">
          <select
            id="parent"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Nenhuma (Categoria Principal)</option>
            <option value="1">Categoria 1</option>
            <option value="2">Categoria 2</option>
            <option value="4">Categoria 4</option>
          </select>
        </FormGroup>
        
        <FormGroup label="Descrição" htmlFor="description">
          <textarea
            id="description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </FormGroup>
        
        <FormGroup label="Imagem" htmlFor="image">
          <input
            type="file"
            id="image"
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </FormGroup>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="active"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            defaultChecked
          />
          <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
            Categoria ativa
          </label>
        </div>
      </div>
    </Modal>
  );
  
  // Renderização do modal de edição
  const renderEditModal = () => {
    if (!selectedCategory) return null;
    
    return (
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Editar Categoria: ${selectedCategory.name}`}
        size="md"
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
                // Lógica para salvar categoria
                setIsEditModalOpen(false);
              }}
              icon="save"
            />
          </div>
        }
      >
        <div className="space-y-4">
          <FormGroup label="Nome" htmlFor="edit-name" required>
            <input
              type="text"
              id="edit-name"
              defaultValue={selectedCategory.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <FormGroup label="Categoria Pai" htmlFor="edit-parent">
            <select
              id="edit-parent"
              defaultValue={selectedCategory.parent === '-' ? '' : selectedCategory.parent}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Nenhuma (Categoria Principal)</option>
              <option value="Categoria 1">Categoria 1</option>
              <option value="Categoria 2">Categoria 2</option>
              <option value="Categoria 4">Categoria 4</option>
            </select>
          </FormGroup>
          
          <FormGroup label="Descrição" htmlFor="edit-description">
            <textarea
              id="edit-description"
              rows={4}
              defaultValue="Descrição da categoria..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </FormGroup>
          
          <FormGroup label="Imagem" htmlFor="edit-image">
            <div className="mb-2">
              <p className="text-sm text-gray-600 mb-2">Imagem atual:</p>
              <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                <i className="fas fa-image text-gray-400"></i>
              </div>
            </div>
            <input
              type="file"
              id="edit-image"
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="edit-active"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              defaultChecked={selectedCategory.status === 'Ativo'}
            />
            <label htmlFor="edit-active" className="ml-2 block text-sm text-gray-900">
              Categoria ativa
            </label>
          </div>
        </div>
      </Modal>
    );
  };
  
  // Renderização do modal de exclusão
  const renderDeleteModal = () => {
    if (!selectedCategory) return null;
    
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
                // Lógica para excluir categoria
                setIsDeleteModalOpen(false);
              }}
              variant="danger"
              icon="trash"
            />
          </div>
        }
      >
        <p>Tem certeza que deseja excluir a categoria <strong>{selectedCategory.name}</strong>?</p>
        
        {selectedCategory.products > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-yellow-700">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              Esta categoria contém {selectedCategory.products} produtos. Ao excluí-la, esses produtos ficarão sem categoria.
            </p>
          </div>
        )}
        
        {selectedCategory.parent === '-' && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-yellow-700">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              Esta é uma categoria principal. Ao excluí-la, todas as subcategorias também serão excluídas.
            </p>
          </div>
        )}
        
        <p className="text-sm text-gray-600 mt-4">Esta ação não pode ser desfeita.</p>
      </Modal>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 flex-shrink-0">
        <AdminSidebar activeLink="categories" />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <AdminHeader 
              title="Categorias" 
              subtitle="Gerencie as categorias da sua loja"
            />
            
            <div>
              <ActionButton
                label="Adicionar Categoria"
                onClick={handleAddClick}
                icon="plus"
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
                  placeholder="Nome da categoria"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="parent-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo
                </label>
                <select
                  id="parent-filter"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas as categorias</option>
                  <option value="main">Categorias principais</option>
                  <option value="sub">Subcategorias</option>
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
          
          {/* Tabela de categorias */}
          <DataTable 
            columns={columns} 
            data={categories}
            onRowClick={handleRowClick}
          />
          
          {/* Paginação */}
          <AdminPagination
            currentPage={currentPage}
            totalPages={3}
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

export default AdminCategories;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
