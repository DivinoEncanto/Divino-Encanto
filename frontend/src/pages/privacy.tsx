import React from 'react';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';

const PrivacyPolicyPage: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              A Divino Encanto Unipessoal Lda (NIF 517772221) está empenhada em proteger a privacidade dos utilizadores do nosso site. Esta Política de Privacidade explica como recolhemos, utilizamos, divulgamos e protegemos as suas informações pessoais.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">1. Informações que Recolhemos</h2>
            <p className="mb-4">
              Podemos recolher os seguintes tipos de informações pessoais:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Informações de identificação (nome, endereço de email, número de telefone)</li>
              <li>Informações de faturação e envio (endereço, código postal)</li>
              <li>Informações de pagamento (processadas de forma segura através dos nossos parceiros de pagamento)</li>
              <li>Histórico de compras e preferências</li>
              <li>Informações de navegação e utilização do site</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. Como Utilizamos as Suas Informações</h2>
            <p className="mb-4">
              Utilizamos as suas informações pessoais para:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Processar e entregar as suas encomendas</li>
              <li>Gerir a sua conta e fornecer suporte ao cliente</li>
              <li>Enviar comunicações sobre os seus pedidos, produtos e promoções (com o seu consentimento)</li>
              <li>Melhorar o nosso site e a experiência de compra</li>
              <li>Cumprir as nossas obrigações legais e fiscais</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">3. Partilha de Informações</h2>
            <p className="mb-4">
              Podemos partilhar as suas informações com:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Prestadores de serviços (processamento de pagamentos, envio, armazenamento de dados)</li>
              <li>Parceiros de negócios (quando necessário para fornecer os produtos ou serviços solicitados)</li>
              <li>Autoridades legais (quando exigido por lei)</li>
            </ul>
            <p className="mb-4">
              Não vendemos ou alugamos as suas informações pessoais a terceiros para fins de marketing.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">4. Segurança de Dados</h2>
            <p className="mb-4">
              Implementamos medidas de segurança técnicas e organizacionais para proteger as suas informações pessoais contra acesso não autorizado, perda ou alteração. Utilizamos encriptação SSL para proteger as transações online.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">5. Os Seus Direitos</h2>
            <p className="mb-4">
              De acordo com o RGPD, tem os seguintes direitos:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Acesso às suas informações pessoais</li>
              <li>Correção de informações imprecisas</li>
              <li>Eliminação das suas informações (em determinadas circunstâncias)</li>
              <li>Restrição ou oposição ao processamento</li>
              <li>Portabilidade dos dados</li>
              <li>Retirada do consentimento</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">6. Cookies e Tecnologias Semelhantes</h2>
            <p className="mb-4">
              Utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência no nosso site, analisar o tráfego e personalizar o conteúdo. Pode gerir as suas preferências de cookies através das configurações do seu navegador.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">7. Alterações a Esta Política</h2>
            <p className="mb-4">
              Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre disponível no nosso site.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">8. Contacto</h2>
            <p className="mb-4">
              Se tiver dúvidas sobre esta Política de Privacidade ou quiser exercer os seus direitos, contacte-nos:
            </p>
            <p className="mb-4">
              Divino Encanto Unipessoal Lda<br />
              NIF: 517772221<br />
              Email: geral@divinoencanto.com<br />
              Telefone: +351931307266
            </p>

            <p className="mt-8 text-sm text-gray-500">
              Última atualização: 20 de abril de 2025
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
