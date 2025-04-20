import React from 'react';

interface AddressCardProps {
  address: {
    id: string;
    name: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ 
  address, 
  onEdit, 
  onDelete, 
  onSetDefault 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      {address.isDefault && (
        <div className="mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Endereço Padrão
          </span>
        </div>
      )}
      
      <h3 className="text-lg font-medium text-gray-900">{address.name}</h3>
      
      <div className="mt-2 text-sm text-gray-500">
        <p>{address.street}</p>
        <p>{address.city}, {address.postalCode}</p>
        <p>{address.country}</p>
      </div>
      
      <div className="mt-4 flex space-x-3">
        <button
          onClick={() => onEdit(address.id)}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Editar
        </button>
        
        <button
          onClick={() => onDelete(address.id)}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Eliminar
        </button>
        
        {!address.isDefault && (
          <button
            onClick={() => onSetDefault(address.id)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-blue-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Definir como Padrão
          </button>
        )}
      </div>
    </div>
  );
};

export default AddressCard;
