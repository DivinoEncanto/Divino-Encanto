import React from 'react';
import { useTranslation } from 'next-i18next';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const AdminPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const { t } = useTranslation('common');
  
  if (totalPages <= 1) return null;
  
  // Determinar quais páginas mostrar
  const getPageNumbers = () => {
    const pages = [];
    
    // Sempre mostrar a primeira página
    pages.push(1);
    
    // Adicionar páginas intermediárias
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 2 && currentPage > 3) {
        pages.push('...');
      } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
        pages.push('...');
      } else {
        pages.push(i);
      }
    }
    
    // Sempre mostrar a última página se houver mais de uma página
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    // Remover duplicatas
    return [...new Set(pages)];
  };
  
  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center justify-center mt-6 ${className}`}>
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        {/* Botão Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <span className="sr-only">Anterior</span>
          <i className="fas fa-chevron-left"></i>
        </button>
        
        {/* Números de página */}
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(Number(page))}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === page
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
        
        {/* Botão Próximo */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
            currentPage === totalPages
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <span className="sr-only">Próximo</span>
          <i className="fas fa-chevron-right"></i>
        </button>
      </nav>
    </div>
  );
};

export default AdminPagination;
