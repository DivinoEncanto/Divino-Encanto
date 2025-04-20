import React from 'react';
import Layout from '../../components/layout/Layout';
import AccountSidebar from '../../components/account/AccountSidebar';
import ProfileForm from '../../components/account/ProfileForm';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Profile = () => {
  const [userData, setUserData] = React.useState({
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    phone: '+351 912345678',
    password: '',
    confirmPassword: ''
  });

  const handleUpdateProfile = (data: any) => {
    console.log('Perfil atualizado:', data);
    setUserData({
      ...userData,
      ...data,
      password: '',
      confirmPassword: ''
    });
    
    // Aqui seria feita a chamada à API para atualizar o perfil
    alert('Perfil atualizado com sucesso!');
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <AccountSidebar activeTab="profile" />
            </div>
            
            <div className="md:col-span-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Meu Perfil</h1>
                
                <ProfileForm 
                  initialData={userData}
                  onSubmit={handleUpdateProfile}
                />
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

export default Profile;
