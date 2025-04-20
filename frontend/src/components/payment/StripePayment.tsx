import React from 'react';

interface StripePaymentProps {
  amount: number;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: any) => void;
}

const StripePayment: React.FC<StripePaymentProps> = ({ amount, onSuccess, onError }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiry, setExpiry] = React.useState('');
  const [cvc, setCvc] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!cardNumber || !expiry || !cvc) {
      setError('Por favor, preencha todos os campos do cartão');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulação de processamento de pagamento
    setTimeout(() => {
      setLoading(false);
      onSuccess({ id: 'pi_demo_123456', status: 'succeeded' });
    }, 1500);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <div className="flex items-center justify-center mb-4">
        <svg width="103" height="43" viewBox="0 0 103 43" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.9 19.4c0-3 2.5-4.1 4.4-4.1 1.9 0 3.8.6 5.1.9l-.6-3.8c-1.1-.4-2.7-.8-4.9-.8-5 0-8.4 2.6-8.4 7 0 4.3 5.6 5.7 5.6 8.6 0 1.2-1 2.2-2.9 2.2-2.4 0-4.6-1-5.8-1.7l-1 3.9c1.5.7 4.1 1.4 6.5 1.4 5.5 0 8.7-2.7 8.7-7.1 0-4.6-5.7-5.9-5.7-8.5zm16.2-9.3l-.7 3.3c-.7-.3-1.5-.5-2.4-.5-2 0-3.8 1.2-4.8 3.2l-3.6 17.1h4.5l1.3-6.3h1.1l.9 6.3h4.7l-1.1-8.5c3.7-.1 5.5-2.5 6.2-5.6h-4.1c-.3 1.3-.9 2.2-2.1 2.2h-.8l1.8-8.4c0 .1-.9 2.8-4.9 2.8zm10.4 19.1h4.5l3.1-14.3h-4.5l-3.1 14.3zm4.9-16.1c1.3 0 2.2-1.1 2.2-2.4 0-1.3-.9-2.4-2.2-2.4-1.3 0-2.2 1.1-2.2 2.4 0 1.3.9 2.4 2.2 2.4zm3.1 1.8h4.5l.6-2.8h3.2l-.7 2.8h2.8l-.7 3.2h-2.8l-1.1 5.2c-.2.9-.1 1.5.2 1.9.3.4.8.6 1.5.6.5 0 .9-.1 1.3-.2l-.7 3.3c-.7.2-1.6.4-2.5.4-1.5 0-2.6-.4-3.2-1.2-.7-.8-.9-2.1-.6-3.8l1.2-6.2h-1.3l.7-3.2zm11.1 16.1h4.5l1.9-8.9.3.5c.8 1.2 2.1 1.9 3.4 1.9 3.1 0 5.9-3 5.9-7.4 0-2.6-1.6-4.7-4.4-4.7-1.3 0-2.6.6-3.5 1.7l.3-1.4h-4.5l-3.9 18.3zm7.9-10.6c-1.2 0-2.1 1.1-2.1 2.7 0 1 .5 1.7 1.3 1.7 1.2 0 2.1-1.1 2.1-2.7 0-1-.5-1.7-1.3-1.7zm10.2 10.6h4.5l2.2-10.2c.3-1.5 1.6-2.6 2.9-2.6.7 0 1.3.3 1.6.8.3.5.3 1.2.1 2.1l-2.2 9.9h4.5l2.2-10.4c.4-1.8.2-3.2-.6-4.1-.8-.9-2.1-1.4-3.7-1.4-1.6 0-3.1.7-4.1 1.8l.4-1.5h-4.5l-3.3 15.6zm20.8 0h4.5l3.1-14.3h-4.5l-3.1 14.3zm4.9-16.1c1.3 0 2.2-1.1 2.2-2.4 0-1.3-.9-2.4-2.2-2.4-1.3 0-2.2 1.1-2.2 2.4 0 1.3.9 2.4 2.2 2.4zm6.1 16.1h4.5l1.9-8.9c.3-1.5 1.6-2.6 2.9-2.6.7 0 1.3.3 1.6.8.3.5.3 1.2.1 2.1l-2.2 9.9h4.5l2.2-10.4c.4-1.8.2-3.2-.6-4.1-.8-.9-2.1-1.4-3.7-1.4-1.6 0-3 .7-4 1.8l.4-1.5h-4.5l-3.1 15.3z" fill="#675C4F"/>
        </svg>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
            Número do Cartão
          </label>
          <input
            id="card-number"
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
              Data de Validade
            </label>
            <input
              id="expiry"
              type="text"
              placeholder="MM/AA"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              id="cvc"
              type="text"
              placeholder="123"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Processando...' : `Pagar €${amount.toFixed(2)}`}
        </button>
      </form>
    </div>
  );
};

export default StripePayment;
