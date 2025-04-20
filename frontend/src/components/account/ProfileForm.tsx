import React from 'react';

interface ProfileFormProps {
  initialData?: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  };
  onSubmit: (data: any) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  initialData = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  }, 
  onSubmit 
}) => {
  const [formData, setFormData] = React.useState(initialData);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [changePassword, setChangePassword] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (formData.phone && !/^(\+\d{1,3})?\s?\d{9,10}$/.test(formData.phone)) {
      newErrors.phone = 'Número de telefone inválido';
    }
    
    if (changePassword) {
      if (!formData.password) {
        newErrors.password = 'Password é obrigatória';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password deve ter pelo menos 8 caracteres';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'As passwords não coincidem';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      // If not changing password, remove password fields from submission
      const dataToSubmit = changePassword 
        ? formData 
        : { name: formData.name, email: formData.email, phone: formData.phone };
      
      onSubmit(dataToSubmit);
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.email ? 'border-red-300' : ''
          }`}
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Telefone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
            errors.phone ? 'border-red-300' : ''
          }`}
        />
        {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
      </div>

      <div className="flex items-center">
        <input
          id="changePassword"
          name="changePassword"
          type="checkbox"
          checked={changePassword}
          onChange={() => setChangePassword(!changePassword)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="changePassword" className="ml-2 block text-sm text-gray-900">
          Alterar Password
        </label>
      </div>

      {changePassword && (
        <>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Nova Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.password ? 'border-red-300' : ''
              }`}
            />
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmar Nova Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
                errors.confirmPassword ? 'border-red-300' : ''
              }`}
            />
            {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
        </>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Guardar Alterações
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
