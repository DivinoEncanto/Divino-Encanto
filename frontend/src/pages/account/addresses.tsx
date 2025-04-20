import React from 'react';
import Layout from '../../components/layout/Layout';
import AccountSidebar from '../../components/account/AccountSidebar';
import AddressCard from '../../components/account/AddressCard';
import AddressForm from '../../components/account/AddressForm';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Addresses = () => {
  const [addresses, setAddresses] = React.useState([
    {
      id: '1',
      name: 'João Silva',
      street: 'Rua das Flores, 123',
      city: 'Lisboa',
      postalCode: '1000-001',
      country: 'Portugal',
      isDefault: true,
    },
    {
      id: '2',
      name: 'João Silva',
      street: 'Avenida da República, 45',
      city: 'Porto',
      postalCode: '4000-002',
      country: 'Portugal',
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = React.useState(false);
  const [editingAddress, setEditingAddress] = React.useState<any>(null);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleEditAddress = (id: string) => {
    const address = addresses.find(addr => addr.id === id);
    if (address) {
      setEditingAddress(address);
      setShowForm(true);
    }
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleSubmitAddress = (data: any) => {
    if (editingAddress) {
      // Update existing address
      setAddresses(
        addresses.map(addr => 
          addr.id === editingAddress.id 
            ? { ...data, id: editingAddress.id } 
            : addr.isDefault && data.isDefault 
              ? { ...addr, isDefault: false } 
              : addr
        )
      );
    } else {
      // Add new address
      const newAddress = {
        ...data,
        id: `${Date.now()}`,
      };
      
      // If new address is default, update other addresses
      if (newAddress.isDefault) {
        setAddresses(
          addresses.map(addr => ({
            ...addr,
            isDefault: false,
          })).concat(newAddress)
        );
      } else {
        setAddresses([...addresses, newAddress]);
      }
    }
    
    setShowForm(false);
    setEditingAddress(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <AccountSidebar activeTab="addresses" />
            </div>
            
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-semibold text-gray-900">Meus Endereços</h1>
                  <button
                    onClick={handleAddAddress}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Adicionar Endereço
                  </button>
                </div>
                
                {showForm ? (
                  <div className="mb-8">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      {editingAddress ? 'Editar Endereço' : 'Novo Endereço'}
                    </h2>
                    <AddressForm
                      initialData={editingAddress}
                      onSubmit={handleSubmitAddress}
                      onCancel={handleCancelForm}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map(address => (
                      <AddressCard
                        key={address.id}
                        address={address}
                        onEdit={handleEditAddress}
                        onDelete={handleDeleteAddress}
                        onSetDefault={handleSetDefaultAddress}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Addresses;
