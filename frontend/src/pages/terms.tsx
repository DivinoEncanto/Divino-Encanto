import React from 'react';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';

const TermsAndConditionsPage: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Termos e Condições</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              Bem-vindo ao site da Divino Encanto. Ao aceder e utilizar este site, concorda com os seguintes termos e condições. Por favor, leia-os atentamente.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">1. Informações Gerais</h2>
            <p className="mb-4">
              Este site é operado pela Divino Encanto Unipessoal Lda, com NIF 517772221, com sede em Portugal. Ao utilizar este site, estabelece-se uma relação contratual com a nossa empresa, sujeita a estes termos e condições.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. Utilização do Site</h2>
            <p className="mb-4">
              Ao utilizar o nosso site, compromete-se a:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Fornecer informações verdadeiras, precisas e completas</li>
              <li>Manter a confidencialidade da sua conta e password</li>
              <li>Não utilizar o site para fins ilegais ou não autorizados</li>
              <li>Não interferir com a segurança ou funcionalidade do site</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">3. Produtos e Preços</h2>
            <p className="mb-4">
              Esforçamo-nos para apresentar descrições precisas dos produtos e preços atualizados. No entanto, reservamo-nos o direito de:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Modificar os preços sem aviso prévio</li>
              <li>Limitar as quantidades de produtos disponíveis para venda</li>
              <li>Descontinuar produtos</li>
              <li>Recusar ou cancelar encomendas em caso de erro de preço ou descrição</li>
            </ul>
            <p className="mb-4">
              Todos os preços incluem IVA à taxa legal em vigor.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">4. Encomendas e Pagamentos</h2>
            <p className="mb-4">
              Ao efetuar uma encomenda, está a fazer uma oferta de compra. A aceitação da sua encomenda e a formação do contrato só ocorrem quando recebe a confirmação de envio.
            </p>
            <p className="mb-4">
              Aceitamos os seguintes métodos de pagamento: PayPal, Google Pay, Amazon Pay, Klarna, Stripe e Apple Pay. Todas as transações são processadas de forma segura.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">5. Envio e Entrega</h2>
            <p className="mb-4">
              Os prazos de entrega são estimativas e não garantias. Não somos responsáveis por atrasos causados por circunstâncias fora do nosso controlo.
            </p>
            <p className="mb-4">
              O risco de perda ou dano dos produtos transfere-se para si no momento da entrega ou quando os produtos são entregues ao transportador.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">6. Devoluções e Reembolsos</h2>
            <p className="mb-4">
              Tem o direito de devolver os produtos no prazo de 14 dias a contar da data de receção, sem indicar qualquer motivo. Para mais detalhes, consulte a nossa Política de Devoluções.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">7. Propriedade Intelectual</h2>
            <p className="mb-4">
              Todo o conteúdo deste site, incluindo textos, gráficos, logótipos, imagens e software, é propriedade da Divino Encanto ou dos seus fornecedores e está protegido por leis de direitos de autor e outras leis de propriedade intelectual.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">8. Limitação de Responsabilidade</h2>
            <p className="mb-4">
              Em nenhuma circunstância a Divino Encanto será responsável por quaisquer danos diretos, indiretos, incidentais, especiais ou consequentes resultantes da utilização ou incapacidade de utilização deste site ou dos produtos adquiridos.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">9. Lei Aplicável e Jurisdição</h2>
            <p className="mb-4">
              Estes termos e condições são regidos e interpretados de acordo com as leis de Portugal. Qualquer disputa será submetida à jurisdição exclusiva dos tribunais portugueses.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">10. Alterações aos Termos e Condições</h2>
            <p className="mb-4">
              Reservamo-nos o direito de modificar estes termos e condições a qualquer momento. As alterações entram em vigor imediatamente após a publicação no site.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">11. Contacto</h2>
            <p className="mb-4">
              Se tiver dúvidas sobre estes Termos e Condições, contacte-nos:
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

export default TermsAndConditionsPage;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
