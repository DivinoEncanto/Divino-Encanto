import React from 'react';
import { useTranslation } from 'next-i18next';
import Layout from '../components/layout/Layout';

const ReturnsPage: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Política de Devoluções</h1>
          
          <div className="prose max-w-none">
            <p className="mb-4">
              A Divino Encanto Unipessoal Lda está empenhada em garantir a sua total satisfação. Esta política de devoluções explica os procedimentos e condições para devoluções e reembolsos.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">1. Direito de Livre Resolução</h2>
            <p className="mb-4">
              De acordo com a legislação portuguesa e europeia, tem o direito de resolver o contrato no prazo de 14 dias de calendário, sem necessidade de indicar qualquer motivo. O prazo de livre resolução expira 14 dias a contar do dia em que adquire, ou um terceiro por si indicado (que não o transportador) adquire a posse física dos bens.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">2. Como Exercer o Direito de Livre Resolução</h2>
            <p className="mb-4">
              Para exercer o seu direito de livre resolução, deve informar-nos da sua decisão através de uma declaração inequívoca (por exemplo, carta enviada por correio, fax ou email). Pode utilizar o modelo de formulário de resolução disponível no nosso site, mas não é obrigatório.
            </p>
            <p className="mb-4">
              Para cumprir o prazo de livre resolução, basta enviar a sua comunicação referente ao exercício do direito de livre resolução antes do termo do prazo de resolução.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">3. Efeitos da Livre Resolução</h2>
            <p className="mb-4">
              Em caso de resolução do contrato, reembolsaremos todos os pagamentos recebidos, incluindo os custos de entrega (com exceção de custos suplementares resultantes da sua escolha de uma modalidade de envio diferente da modalidade menos dispendiosa por nós oferecida), sem demora injustificada e, em qualquer caso, o mais tardar 14 dias a contar da data em que formos informados da sua decisão de resolução do contrato.
            </p>
            <p className="mb-4">
              Efetuaremos o reembolso usando o mesmo meio de pagamento que usou na transação inicial, salvo acordo expresso em contrário da sua parte; em qualquer caso, não incorre em quaisquer custos como consequência do reembolso.
            </p>
            <p className="mb-4">
              Podemos reter o reembolso até termos recebido os bens devolvidos, ou até que apresente prova do envio dos bens, consoante o que ocorrer primeiro.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">4. Devolução dos Produtos</h2>
            <p className="mb-4">
              Deve devolver os produtos sem demora injustificada e o mais tardar 14 dias a contar do dia em que nos informar da livre resolução do contrato. Considera-se que o prazo é respeitado se devolver os bens antes do termo do prazo de 14 dias.
            </p>
            <p className="mb-4">
              Os custos diretos da devolução dos bens são da sua responsabilidade.
            </p>
            <p className="mb-4">
              Só é responsável pela depreciação dos bens que decorra de uma manipulação que exceda o necessário para verificar a natureza, as características e o funcionamento dos bens.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">5. Condições para Devolução</h2>
            <p className="mb-4">
              Para que os produtos sejam aceites para devolução, devem:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Estar em perfeito estado, sem sinais de uso</li>
              <li>Incluir todas as etiquetas originais</li>
              <li>Estar na embalagem original</li>
              <li>Ser acompanhados do comprovativo de compra</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">6. Produtos Defeituosos</h2>
            <p className="mb-4">
              Se receber um produto defeituoso ou danificado, por favor contacte-nos imediatamente. Terá direito a:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Reparação do produto</li>
              <li>Substituição do produto</li>
              <li>Redução do preço</li>
              <li>Resolução do contrato (reembolso)</li>
            </ul>
            <p className="mb-4">
              Os custos de devolução de produtos defeituosos serão suportados por nós.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">7. Exceções</h2>
            <p className="mb-4">
              O direito de livre resolução não se aplica a:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Produtos personalizados ou feitos à medida</li>
              <li>Produtos selados que não sejam suscetíveis de devolução por motivos de proteção de saúde ou de higiene quando abertos após a entrega</li>
              <li>Produtos que, após a entrega, devido à sua natureza, fiquem inseparavelmente misturados com outros artigos</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">8. Contacto</h2>
            <p className="mb-4">
              Para exercer o seu direito de livre resolução ou para qualquer questão relacionada com devoluções, contacte-nos:
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

export default ReturnsPage;

// Configuração para i18n
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      // Você precisará configurar o i18next aqui
    },
  };
}
