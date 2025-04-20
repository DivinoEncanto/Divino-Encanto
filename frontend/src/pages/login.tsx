import React from 'react';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/account/LoginForm';

const LoginPage: React.FC = () => {
  const { t } = useTranslation('common');
  
  const handleLogin = (data: { email: string; password: string }) => {
    // Em uma implementação real, aqui processaria o login
    console.log('Dados de login:', data);
  };
  
  const handleForgotPassword = () => {
    // Em uma implementação real, aqui redirecionaria para a página de recuperação de senha
    console.log('Recuperar senha');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <LoginForm 
          onSubmit={handleLogin} 
          onForgotPassword={handleForgotPassword} 
        />
      </div>
    </Layout>
  );
};

export default LoginPage;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
