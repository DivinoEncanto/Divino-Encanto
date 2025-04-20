import React from 'react';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';
import RegisterForm from '../components/account/RegisterForm';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation('common');
  
  const handleRegister = (data: { name: string; email: string; password: string; confirmPassword: string }) => {
    // Em uma implementação real, aqui processaria o registo
    console.log('Dados de registo:', data);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <RegisterForm onSubmit={handleRegister} />
      </div>
    </Layout>
  );
};

export default RegisterPage;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
