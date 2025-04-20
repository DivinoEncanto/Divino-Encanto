import React from 'react';
import { useTranslation } from 'next-i18next';

interface NewsletterSignupProps {
  title?: string;
  subtitle?: string;
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  title = "Subscreva a nossa newsletter", 
  subtitle = "Receba as últimas novidades e promoções diretamente no seu email." 
}) => {
  const { t } = useTranslation('common');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementada a lógica para processar a inscrição na newsletter
  };

  return (
    <div className="bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{subtitle}</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Seu email"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {t('footer.subscribe')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
