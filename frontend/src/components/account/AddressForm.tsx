import React, { useState } from 'react';

interface AddressFormProps {
  initialData?: {
    id?: string;
    name: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ 
  initialData = {
    name: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'Portugal',
    isDefault: false
  }, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!formData.street.trim()) {
      newErrors.street = 'Morada é obrigatória';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Código Postal é obrigatório';
    } else if (!/^\d{4}-\d{3}$/.test(formData.postalCode) && formData.country === 'Portugal') {
      newErrors.postalCode = 'Código Postal inválido (formato: 1234-567)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome Completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.name ? 'border-red-300' : ''
          }`}
        />
        {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
          Morada
        </label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.street ? 'border-red-300' : ''
          }`}
        />
        {errors.street && <p className="mt-2 text-sm text-red-600">{errors.street}</p>}
      </div>

      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Cidade
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              errors.city ? 'border-red-300' : ''
            }`}
          />
          {errors.city && <p className="mt-2 text-sm text-red-600">{errors.city}</p>}
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Código Postal
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="1234-567"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
              errors.postalCode ? 'border-red-300' : ''
            }`}
          />
          {errors.postalCode && <p className="mt-2 text-sm text-red-600">{errors.postalCode}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          País
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="Portugal">Portugal</option>
          <option value="Espanha">Espanha</option>
          <option value="França">França</option>
          <option value="Alemanha">Alemanha</option>
          <option value="Reino Unido">Reino Unido</option>
          <option value="Itália">Itália</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          id="isDefault"
          name="isDefault"
          type="checkbox"
          checked={formData.isDefault}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900">
          Definir como endereço padrão
        </label>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
